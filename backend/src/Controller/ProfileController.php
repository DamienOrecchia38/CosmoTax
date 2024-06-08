<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;

class ProfileController extends AbstractController
{
    #[Route('/api/profile', name: 'app_profile', methods: ['GET'])]
    public function index(): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        return $this->json([
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstname(),
            'lastName' => $user->getLastname(),
            'address' => $user->getAdress(),
            'phone' => $user->getPhone(),
        ]);
    }

    #[Route('/api/profile', name: 'app_profile_update', methods: ['PUT'])]
    public function update(Request $request, EntityManagerInterface $entityManager): Response
    {
        /** @var User $user */
        $user = $this->getUser();

        $data = json_decode($request->getContent(), true);

        $user->setEmail($data['email']);
        $user->setFirstname($data['firstName']);
        $user->setLastname($data['lastName']);
        $user->setAdress($data['address']);
        $user->setPhone($data['phone']);

        $entityManager->flush();

        return $this->json([
            'message' => 'Profil mis à jour avec succès',
        ]);
    }
}