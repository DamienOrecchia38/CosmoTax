<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class UserProfileTest extends WebTestCase
{
    public function testGetUserProfile(): void
    {
        $client = static::createClient();
        $client->request('GET', 'http://localhost:8000/api/profile', [
            'headers' => [
                'Authorization' => 'Bearer valid_token',
            ],
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
        $this->assertArrayHasKey('email', json_decode($client->getResponse()->getContent(), true));
    }

    public function testUpdateUserProfile(): void
    {
        $client = static::createClient();
        $client->request('PUT', 'http://localhost:8000/api/profile', [
            'headers' => [
                'Authorization' => 'Bearer valid_token',
            ],
            'json' => [
                'firstname' => 'Damien',
                'lastname' => 'Orecchia',
                'address' => '20 rue du code',
                'phone' => '0987654321',
            ],
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
        $responseContent = json_decode($client->getResponse()->getContent(), true);
        $this->assertEquals('Damien', $responseContent['firstname']);
        $this->assertEquals('Orecchia', $responseContent['lastname']);
    }
}