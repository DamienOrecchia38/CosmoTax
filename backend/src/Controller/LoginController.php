<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;

class LoginController extends AbstractController
{
    private UserRepository $userRepository;
    private UserPasswordHasherInterface $passwordHasher;
    private JWTTokenManagerInterface $jwtEncoder;

    public function __construct(
        UserRepository $userRepository,
        UserPasswordHasherInterface $passwordHasher,
        JWTTokenManagerInterface $jwtEncoder
    ) {
        $this->userRepository = $userRepository;
        $this->passwordHasher = $passwordHasher;
        $this->jwtEncoder = $jwtEncoder;
    }

    #[Route('/api/login_check', name: 'api_login_check', methods: ['POST'])]
    public function login(Request $request): Response
    {
        $requestContent = json_decode($request->getContent(), true);
        
        $user = $this->userRepository->findOneBy(['email' => $requestContent['email']]);
    
        if (!$user || !$this->passwordHasher->isPasswordValid($user, $requestContent['password'])) {
            return new JsonResponse(['error' => 'Email ou mot de passe incorrect'], Response::HTTP_UNAUTHORIZED);
        }
    
        $token = $this->jwtEncoder->create($user);
        
        return new JsonResponse(['token' => $token], Response::HTTP_OK);
    }
}
