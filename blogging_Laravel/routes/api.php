<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\CommentController;
use Illuminate\Support\Facades\Route;



Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('userIsAdmin/{userId}', 'userIsAdmin');
});



Route::controller(BlogController::class)->group(function () {
    Route::middleware('can:admin')->group(function () {
        Route::put('adminUpdateBlog/{id}', 'adminUpdate');
        Route::delete('adminDeleteBlog/{id}', 'adminDelete');
    });
    Route::post('addBlog', 'addBlog');
    Route::put('updateBlog/{id}/{user_id}', 'update');
    Route::delete('deleteBlog/{id}/{user_id}', 'delete');
    Route::get('showBlog/{id}', 'showBlog');
    Route::get('getAllBlog', 'getAllBlog');
});

Route::controller(CommentController::class)->group(function () {
    Route::middleware('can:admin')->group(function () {
        Route::put('adminUpdateComment/{id}', 'adminUpdate');
        Route::delete('adminDeleteComment/{id}', 'adminDelete');
    });
    Route::post('addComment', 'addComment');
    Route::put('updateComment/{id}/{user_id}', 'update');
    Route::delete('deleteComment/{id}/{user_id}', 'delete');
    Route::get('showComment/{id}', 'show');
    Route::get('getCommentByBlogId/{blogId}', 'getCommentByBlogId');
});
