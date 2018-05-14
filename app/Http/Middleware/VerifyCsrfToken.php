<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'google-clicked/search',
        'googlesheet/update',
        'update-store-description/update',
        'dashboard/filter',
        'store/geneFromGGS',
        'store/addNewCouponCPD',
        'store/AddFakeCouponWhenAddChildStore'
    ];
}
