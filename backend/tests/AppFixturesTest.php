<?php
namespace App\Tests\DataFixtures;

use App\DataFixtures\AppFixtures;
use Doctrine\Persistence\ObjectManager;
use PHPUnit\Framework\TestCase;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixturesTest extends TestCase
{
    public function testLoad(): void
    {
        $passwordHasher = $this->createMock(UserPasswordHasherInterface::class);
        $objectManager = $this->createMock(ObjectManager::class);
        $fixture = new AppFixtures($passwordHasher);
        $this->assertNotEmpty($fixture->load($objectManager));
    }
}