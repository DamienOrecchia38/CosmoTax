<?php

namespace App\DataFixtures;

use App\Entity\Tax;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');

        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setEmail($faker->email());
            $user->setPassword($this->passwordHasher->hashPassword($user, 'password'));
            $user->setFirstName($faker->firstName());
            $user->setLastName($faker->lastName());
            $user->setAdress($faker->address());
            $user->setCardNumber($faker->creditCardNumber());
            $user->setCryptogram($faker->numberBetween(100, 999));
            $user->setExpirationDate($faker->creditCardExpirationDate());

            $phoneNumber = preg_replace('/\D+/', '', $faker->phoneNumber());
            $user->setPhone((int) $phoneNumber);

            $manager->persist($user);

            for ($j = 0; $j < mt_rand(1, 5); $j++) {
                $tax = new Tax();
                $tax->setUser($user);
                $tax->setTitle($faker->sentence(3));
                $tax->setDescription($faker->paragraph(2));
                $tax->setAmount($faker->numberBetween(10, 1000));
                $manager->persist($tax);
            }
        }


        $manager->flush();
    }
}