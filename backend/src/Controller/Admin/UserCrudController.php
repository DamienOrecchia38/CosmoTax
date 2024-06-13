<?php

namespace App\Controller\Admin;

use App\Entity\User;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractCrudController;
use EasyCorp\Bundle\EasyAdminBundle\Field\ChoiceField;
use EasyCorp\Bundle\EasyAdminBundle\Field\TextField;

class UserCrudController extends AbstractCrudController
{
    public static function getEntityFqcn(): string
    {
        return User::class;
    }

    public function configureFields(string $pageName): iterable
    {
        return [
            TextField::new('firstname'),
            TextField::new('lastname'),
            TextField::new('adress'),
            TextField::new('email'),
            TextField::new('password'),
            ChoiceField::new('roles', 'Roles')
                ->setPermission(('ROLE_USER'))
                ->allowMultipleChoices()
                ->setChoices([
                    'User' => 'ROLE_USER',
                    'Admin' => 'ROLE_ADMIN'
                ])
                ->renderAsBadges([
                    'ROLE_USER' => 'primary',
                    'ROLE_ADMIN' => 'danger',
                ])
        ];
    }
}
