<?php

namespace App\Tests;

use ApiPlatform\Symfony\Bundle\Test\ApiTestCase;
use Symfony\Component\HttpFoundation\Response;

class AuthenticationTest extends ApiTestCase
{
    public function testSuccessfulLogin(): void
    {
        $client = static::createClient();
        $client->request('POST', '/login_endpoint', [
            'json' => [
                'username' => 'valid_username',
                'password' => 'valid_password',
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
        $client->request('POST', '/login_endpoint', [
            'json' => [
                'username' => 'invalid_username',
                'password' => 'invalid_password',
            ],
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }

    public function testAccessToProtectedResource(): void
    {
        $client = static::createClient();
        $client->request('GET', '/protected_resource_endpoint', [], [], [
            'HTTP_Authorization' => 'Bearer valid_token',
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
    }

    public function testDeniedAccessToProtectedResource(): void
    {
        $client = static::createClient();
        $client->request('GET', '/protected_resource_endpoint');

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }
}