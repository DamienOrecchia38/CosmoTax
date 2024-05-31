<?php

namespace App\Controller;

use App\Entity\User;
use DateTime;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class SignUpController extends AbstractController
{
    private EntityManagerInterface $entityManager;
    private UserPasswordHasherInterface $passwordHasher;
    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher,
    ) {
        $this->entityManager = $entityManager;
        $this->passwordHasher = $passwordHasher;
    }
    public function __invoke(Request $request): Response
    {
        // Décode la requête.
        $requestContent = json_decode($request->getContent(), true);
        // Si les clés "email" et "password" ne sont pas présentent dans la 
        // requête renvoie une erreur.
        if (
            !array_key_exists('email', $requestContent) ||
            !array_key_exists(
                'password',
                $requestContent
            )
        ) {

            $message = 'Un problème technique est survenu, veuillez réessayer ultérieu
 return new Response($message, 500)';
        }
        $userRoles = $requestContent['roles'];
        $userEmail = $requestContent['email'];
        $userPassword = $requestContent['password'];
        $userFirstName = $requestContent['firstname'];
        $userLastName = $requestContent['lastname'];
        $userAdress = $requestContent['adress'];
        $userPhone = $requestContent['phone'];
        $userCardNumber = $requestContent['card_number'];
        $userCryptogram = $requestContent['cryptogram'];
        $userExpirationDate = $requestContent['expiration_date'];
        $userRepository = $this->entityManager->getRepository(User::class);
        $registeredUser = $userRepository->findOneBy(['email' => $userEmail]);
        // Si l'utilisateur est déjà enregistré renvoie une erreur.
        if ($registeredUser) {
            return new Response('Adresse email déjà enregistrée', 409);
        }
        // Hash le mot de passe de l'utilisateur et l'enregistre.
        $newUser = new User();
        $userExpirationDate = new DateTime($userExpirationDate);
        $newUser->setEmail($userEmail);
        $newUser->setPassword(
            $this->passwordHasher->hashPassword($newUser, $userPassword)
        );
        $newUser->setRoles($userRoles);
        $newUser->setFirstName($userFirstName);
        $newUser->setLastName($userLastName);
        $newUser->setAdress($userAdress);
        $newUser->setPhone($userPhone);
        $newUser->setCardNumber($userCardNumber);
        $newUser->setCryptogram($userCryptogram);
        $newUser->setExpirationDate($userExpirationDate);

        $this->entityManager->persist($newUser);
        $this->entityManager->flush();
        return new Response('OK', 200);
    }
}
