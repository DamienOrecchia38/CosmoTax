<?php

namespace App\Controller;

use App\Repository\TaxRepository;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class PaymentController extends AbstractController
{
    private $entityManager;
    private $taxRepository;
    private $mailer;

    public function __construct(EntityManagerInterface $entityManager, TaxRepository $taxRepository, MailerInterface $mailer)
    {
        $this->entityManager = $entityManager;
        $this->taxRepository = $taxRepository;
        $this->mailer = $mailer;
    }

    // #[Route('/api/payments', name: 'app_payment', methods: ['POST'])]
    public function __invoke(Request $request): JsonResponse
    {
        dd("test");
        $content = json_decode($request->getContent(), true);
        $cardNumber = $content['cardNumber'];
        $cryptogram = $content['cryptogram'];
        $expirationDate = $content['expirationDate'];

        if (!$this->isValidCardNumber($cardNumber)) {
            return new JsonResponse(['error' => 'Numéro de carte invalide'], Response::HTTP_BAD_REQUEST);
        }

        if (!$this->isValidCryptogram($cryptogram)) {
            return new JsonResponse(['error' => 'Cryptogramme invalide'], Response::HTTP_BAD_REQUEST);
        }

        if (!$this->isValidExpirationDate($expirationDate)) {
            return new JsonResponse(['error' => 'Date d\'expiration invalide'], Response::HTTP_BAD_REQUEST);
        }

        $tax = $this->taxRepository->findOneBy(['unique_code' => $content['uniqueCode']]);

        if (!$tax) {
            return new JsonResponse(['error' => 'Code unique invalide'], Response::HTTP_BAD_REQUEST);
        }

        if ($tax->isPaid()) {
            return new JsonResponse(['error' => 'Cette taxe a déjà été payée'], Response::HTTP_BAD_REQUEST);
        }
        
        $response = $this->processPayment($cardNumber, $cryptogram, $expirationDate);

        if ($response->getStatusCode() === Response::HTTP_OK) {
            $tax->setPaid(true);
            $this->entityManager->flush();

            $user = $this->getUser();
            $email = (new Email())
                ->from('cosmotax@gmail.com')
                ->to($user->email)
                ->subject('Confirmation de paiement')
                ->text('Votre paiement a été effectué avec succès.');

            $this->mailer->send($email);

            return new JsonResponse(['message' => 'Paiement effectué avec succès'], Response::HTTP_OK);
        } else {
            return new JsonResponse(['error' => 'Erreur lors du paiement'], Response::HTTP_BAD_REQUEST);
        }
    }

    private function isValidCardNumber(string $cardNumber): bool
    {
        $sum = 0;
        $numDigits = strlen($cardNumber);
        $parity = $numDigits % 2;

        for ($i = 0; $i < $numDigits; $i++) {
            $digit = $cardNumber[$i];
            if ($i % 2 == $parity) {
                $digit *= 2;
                if ($digit > 9) {
                    $digit -= 9;
                }
            }
            $sum += $digit;
        }

        return ($sum % 10) == 0;
    }

    private function isValidCryptogram(string $cryptogram): bool
    {
        return preg_match('/^\d{3,4}$/', $cryptogram) === 1;
    }

    private function isValidExpirationDate(string $expirationDate): bool
    {
        $currentYear = date('Y');
        $currentMonth = date('m');
        list($month, $year) = explode('/', $expirationDate);

        if ($year < $currentYear || ($year == $currentYear && $month < $currentMonth)) {
            return false;
        }

        return preg_match('/^(0[1-9]|1[0-2])\/\d{2}$/', $expirationDate) === 1;
    }

    private function processPayment(string $cardNumber, string $cryptogram, string $expirationDate): Response
    {
        // logique traitement paiement

        // simulation réponse réussie
        return new Response('', Response::HTTP_OK);
    }
}