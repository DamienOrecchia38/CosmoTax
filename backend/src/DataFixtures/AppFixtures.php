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
    
        $taxesData = [
            ['title' => 'Taxe d\'habitation Lunaire', 'description' => 'Taxe sur le cratère d\habitation'],
            ['title' => 'Taxe foncière lunaire', 'description' => 'Taxe sur les propriétés foncières'],
            ['title' => 'Taxe d\'ordures interplanétaires', 'description' => 'Taxe pour la collecte des déchets spatiaux en orbite'],
            ['title' => 'Taxe sur les véhicules spatiaux', 'description' => 'Taxe sur la possession d\'objet volant identifié'],
            ['title' => 'Impôt sur les activités Marsiennes', 'description' => 'Taxe sur les activités Marsiennes'],
            ['title' => 'Amende pour excès de vitesse galactique', 'description' => 'Dépassement non autorisé de la vitesse de la lumière'],
            ['title' => 'Amende pour discrimination envers d\'autres races extraterrestres', 'description' => 'Amende pour injure envers un être biologique non ordinaire'],
            ['title' => 'Amende pour guerre intergalactique non déclaré', 'description' => 'Amende pour une guerre non déclaré'],
        ];

        // Création de l'utilisateur admin
        $admin = new User();
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setEmail('damien@gmail.com');
        $admin->setPassword($this->passwordHasher->hashPassword($admin, '123456'));
        $admin->setFirstName('Damien');
        $admin->setLastName('Orecchia');
        $admin->setAdress($faker->address());
        $admin->setCardNumber($faker->creditCardNumber());
        $admin->setCryptogram($faker->numberBetween(100, 999));
        $admin->setExpirationDate($faker->creditCardExpirationDate());
        $phoneNumber = preg_replace('/\D+/', '', $faker->phoneNumber());
        $admin->setPhone((int) $phoneNumber);
        $manager->persist($admin);

        foreach ($taxesData as $taxData) {
            $tax = new Tax();
            $tax->setUser($admin);
            $tax->setTitle($taxData['title']);
            $tax->setDescription($taxData['description']);
            $tax->setAmount($faker->numberBetween(10, 1000));
            $tax->setPaid((bool) random_int(0, 1));
            $manager->persist($tax);
        }

        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setRoles(['ROLE_USER']);
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

            foreach ($taxesData as $taxData) {
                $tax = new Tax();
                $tax->setUser($user);
                $tax->setTitle($taxData['title']);
                $tax->setDescription($taxData['description']);
                $tax->setAmount($faker->numberBetween(10, 1000));
                $tax->setPaid((bool) random_int(0, 1));
                $manager->persist($tax);
            }
        }
    
        $manager->flush();
    }
}