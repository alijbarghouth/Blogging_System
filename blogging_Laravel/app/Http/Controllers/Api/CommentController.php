<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function addComment(Request $request)
    {
        $validatedData = $request->validate([
            'content' => 'required|string',
            'user_id' => 'required|numeric',
            'blog_id' => 'required|numeric',
        ]);

        $comment = Comment::create($validatedData);

        return response()->json([
            'message' => 'Comment created successfully',
            'blog' => $comment
        ]);
    }

    public function getCommentByBlogId($blogId)
    {
        $comments = Comment::where('blog_id', $blogId)->get();

        return response()->json([
            'comments' => $comments,
        ]);
    }

    public function show($id)
    {
        $comment = Comment::findOrFail($id);
        return response()->json(
            [
                'message' => 'Comment created successfully',
                'comment' => $comment
            ]
        );
    }

    public function adminUpdate(Request $request, $id)
    {
        $validatedData = $request->validate([
            'content' => 'required|string',
            'user_id' => 'required|numeric',
            'blog_id' => 'required|numeric',
        ]);

        $commant = Comment::findOrFail($id);
        $commant->update($validatedData);

        return response()->json([
            'message' => 'Comment Updated successfully',
            'blog' => $commant
        ]);
    }
    public function update(Request $request, $id, $user_id)
    {
        $validatedData = $request->validate([
            'content' => 'required|string',
            'user_id' => 'required|numeric',
            'blog_id' => 'required|numeric',
        ]);

        $commant = Comment::findOrFail($id);

        if ($commant->user_id != $user_id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
        $commant->update($validatedData);

        return response()->json([
            'message' => 'Comment Updated successfully',
            'blog' => $commant
        ]);
    }
    public function adminDelete($id)
    {
        $commant = Comment::findOrFail($id);
        $commant->delete();

        return response()->json([
            'message' => 'Commant Deleted successfully',
            'blog' => $commant
        ]);
    }

    public function delete($id, $user_id)
    {
        $commant = Comment::findOrFail($id);
        
        if ($commant->user_id != $user_id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }
        $commant->delete();

        return response()->json([
            'message' => 'Commant Deleted successfully',
            'blog' => $commant
        ]);
    }
}
