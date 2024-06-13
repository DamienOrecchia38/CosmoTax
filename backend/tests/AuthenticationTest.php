<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationTest extends ApiTestCase
{
    public function testSuccessfulLogin(): void
    {
        $client = static::createClient();
        $client->request('POST', 'http://localhost:8000/api/login_check', [
            'json' => [
                'username' => 'damien@gmail.com',
                'password' => '123456',
            ],
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
        $this->assertResponseHeaderSame('content-type', 'application/json');
        $this->assertJsonContains([
            'token' => 'Bearer',
        ]);
    }

    public function testFailedLogin(): void
    {
        $client = static::createClient();
        $client->request('POST', 'http://localhost:8000/api/login_check', [
            'json' => [
                'username' => 'invalid_username',
                'password' => 'invalid_password',
            ],
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }

    public function testSuccessfulSignUp(): void
    {
        $client = static::createClient();
        $client->request('POST', 'http://localhost:8000/api/users', [
            'json' => [
                'email' => 'damien@gmail.fr',
                'password' => '123456',
                'firstname' => 'Damso',
                'lastname' => 'dododo',
                'address' => '20 rue du code',
                'phone' => '1234567890',
                'card_number' => '4111111111111111',
                'cryptogram' => '123',
                'expiration_date' => '12/25',
            ],
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_CREATED);
    }
}