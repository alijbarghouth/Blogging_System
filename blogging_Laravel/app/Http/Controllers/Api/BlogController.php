<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function addBlog(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|unique:blogs',
            'content' => 'required|string',
            'user_id' => 'required|numeric',
            'file_path' => 'required|string',
            'description' => 'required|string',
        ]);

        $blog = Blog::create($validatedData);

        return response()->json([
            'message' => 'Blog created successfully',
            'blog' => $blog
        ]);
    }

    public function getAllBlog()
    {
        $blog = Blog::all();
        return response()->json(
            [
                'blogs' => $blog
            ]
        );
    }

    public function showBlog($id)
    {
        $blog = Blog::findOrFail($id);
        return response()->json(
            [
                'message' => 'Blog Reterned successfully',
                'blog' => $blog
            ]
        );
    }

    public function adminUpdate(Request $request, $id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'user_id' => 'required|numeric',
            'file_path' => 'required|string',
            'description' => 'required|string',
        ]);

        $blog = Blog::findOrFail($id);
        $blog->update($validatedData);

        return response()->json([
            'message' => 'Blog Updated successfully',
            'blog' => $blog
        ]);
    }

    public function update(Request $request, $id, $user_id)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'user_id' => 'required|numeric',
            'file_path' => 'required|string',
            'description' => 'required|string',
        ]);

        if ($request->user_id != $user_id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
        $blog = Blog::findOrFail($id);
        $blog->update($validatedData);

        return response()->json([
            'message' => 'Blog Updated successfully',
            'blog' => $blog
        ]);
    }

    public function adminDelete($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return response()->json([
            'message' => 'Blog Deleted successfully',
            'blog' => $blog
        ]);
    }

    public function delete($id, $user_id)
    {
        $blog = Blog::findOrFail($id);
        if ($blog->user_id != $user_id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
        $blog->delete();

        return response()->json([
            'message' => 'Blog Deleted successfully',
            'blog' => $blog
        ]);
    }
}
