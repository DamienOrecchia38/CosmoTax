<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ProfileController extends AbstractController
{
    #[Route('/api/profile', name: 'app_profile', methods: ['GET'])]
    public function index(): JsonResponse
    {
        $user = $this->getUser();

        return $this->json([
            'email' => $user->getEmail(),
            'firstName' => $user->getFirstName(),
            'lastName' => $user->getLastName(),  
            'address' => $user->getAddress(),
            'phone' => $user->getPhone(),
        ]);
    }
}