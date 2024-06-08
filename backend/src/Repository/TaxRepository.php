<?php

namespace App\Repository;

use App\Entity\Tax;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class TaxRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Tax::class);
    }

    // Définition de la méthode findBy
    // public function findBy(array $criteria, ?array $orderBy = null, ?int $limit = null, ?int $offset = null): array
    // {
    //     $qb = $this->createQueryBuilder('t');

    //     foreach ($criteria as $key => $value) {
    //         $qb->andWhere('t.' . $key . ' = :' . $key)
    //            ->setParameter($key, $value);
    //     }

    //     if ($orderBy) {
    //         foreach ($orderBy as $key => $value) {
    //             $qb->addOrderBy('t.' . $key, $value);
    //         }
    //     }

    //     if ($limit) {
    //         $qb->setMaxResults($limit);
    //     }

    //     if ($offset) {
    //         $qb->setFirstResult($offset);
    //     }

    //     return $qb->getQuery()->getResult();
    // }
}