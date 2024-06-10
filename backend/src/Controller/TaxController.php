<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
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

    #[Route('/api/taxes/{id}/update-unique-code', name: 'update_tax_unique_code', methods: ['PATCH'])]
    public function updateUniqueCode(int $id, Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $tax = $entityManager->getRepository(Tax::class)->find($id);

        if (!$tax) {
            throw $this->createNotFoundException(
                'No tax found for id '.$id
            );
        }

        $requestContent = json_decode($request->getContent(), true);
        if (isset($requestContent['uniqueCode'])) {
            $tax->setUniqueCode($requestContent['uniqueCode']);
            $entityManager->persist($tax);
            $entityManager->flush();
        }

        return $this->json(['message' => 'Unique code updated successfully']);
    }

    #[Route('/api/check-unique-code', name: 'check_unique_code', methods: ['POST'])]
    public function checkUniqueCode(Request $request, EntityManagerInterface $entityManager): Response
    {
        $requestContent = json_decode($request->getContent(), true);
        $uniqueCode = $requestContent['uniqueCode'];
        $tax = $entityManager->getRepository(Tax::class)->findOneBy(['unique_code' => $uniqueCode]);

        if ($tax) {
            return $this->json($tax, 200, [], ['groups' => 'tax:read']);
        } else {
            return new Response('Code unique invalide', Response::HTTP_UNAUTHORIZED);
        }
    }
}