<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validation;
use Symfony\Component\Validator\Constraints\NotBlank;
use Symfony\Component\Validator\Constraints\Email;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\Collection;
use Symfony\Component\Validator\Constraints\Date;

class SignUpController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }

    #[Route('/api/users', name: 'api_users_post', methods: ['POST'])]
    public function __invoke(Request $request): Response
    {
        $requestContent = json_decode($request->getContent(), true);

        $validator = Validation::createValidator();
        
        $constraints = [
            'email' => [
                new NotBlank(['message' => 'Veuillez entrer une adresse email']),
                new Email(['message' => 'Veuillez entrer une adresse email valide']),
            ],
            'password' => [
                new NotBlank(['message' => 'Veuillez entrer un mot de passe']),
                new Length(['min' => 6, 'minMessage' => 'Votre mot de passe doit contenir au moins {{ limit }} caractères']),
            ],
            'firstname' => new NotBlank(['message' => 'Veuillez entrer votre prénom']),
            'lastname' => new NotBlank(['message' => 'Veuillez entrer votre nom']),
            'address' => new NotBlank(['message' => 'Veuillez entrer votre adresse']),
            'phone' => new NotBlank(['message' => 'Veuillez entrer votre numéro de téléphone']),
            'card_number' => [
                new NotBlank(['message' => 'Veuillez entrer votre numéro de carte']),
            ],
            'cryptogram' => [
                new NotBlank(['message' => 'Veuillez entrer votre cryptogramme']),
                new Length(['min' => 3, 'max' => 3, 'exactMessage' => 'Votre cryptogramme doit contenir {{ limit }} chiffres']),
            ],
            'expiration_date' => [
                new NotBlank(['message' => 'Veuillez entrer la date d\'expiration']),
                new Date(['message' => 'Veuillez entrer une date valide']),
            ],
        ];

        $violations = $validator->validate($requestContent, new Collection($constraints));

        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $violation) {
                $errors[$violation->getPropertyPath()][] = $violation->getMessage();
            }
            return new Response(json_encode($errors), Response::HTTP_BAD_REQUEST);
        }

        $userRepository = $this->entityManager->getRepository(User::class);
        $existingUser = $userRepository->findOneBy(['email' => $requestContent['email']]);

        if ($existingUser) {
            return new Response('Cette adresse email est déjà utilisée', Response::HTTP_CONFLICT);
        }

        $user = new User();
        $user->setEmail($requestContent['email']);
        $user->setRoles(['ROLE_USER']);
        $user->setPassword($this->passwordHasher->hashPassword($user, $requestContent['password']));
        $user->setFirstName($requestContent['firstname']);
        $user->setLastName($requestContent['lastname']);
        $user->setAdress($requestContent['address']);
        $user->setPhone((int)$requestContent['phone']);
        $user->setCardNumber($requestContent['card_number']);
        $user->setCryptogram($requestContent['cryptogram']);
        $user->setExpirationDate(new DateTime($requestContent['expiration_date']));

        $this->entityManager->persist($user);
        $this->entityManager->flush();

        return new Response('Utilisateur créé avec succès', Response::HTTP_CREATED);
    }
}