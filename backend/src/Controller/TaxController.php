<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Tax;
use App\Entity\User;

class TaxController extends AbstractController
{

    #[Route('/api/taxes', name: 'app_taxes', methods: ['GET'])]
    public function getUserTaxes(EntityManagerInterface $entityManager): Response
    {
        /** @var User $user */
        $user = $this->getUser();
        $taxes = $entityManager->getRepository(Tax::class)->findBy(['user' => $user]);
    
        return $this->json($taxes, 200, [], ['groups' => 'tax:read']);
    }

    // #[Route('/api/payments', name: 'app_payment', methods: ['POST'])]
    // public function index(Request $request): Response
    // {
    //     $data = json_decode($request->getContent(), true);

    //     // Vérification du numéro d'identification de règlement
    //     // Vérification des informations bancaires via l'algorithme de Luhn
    //     // Enregistrement du paiement
    //     // Envoi d'un email de confirmation

    //     return $this->json(['message' => 'Paiement effectué avec succès']);
    // }
}