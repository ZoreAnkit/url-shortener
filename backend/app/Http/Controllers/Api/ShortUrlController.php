<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ShortUrl;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ShortUrlController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shortUrls = ShortUrl::all();
        return response()->json(['success' => true, 'shortUrls' => $shortUrls], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'original_url' => 'required|url',
            ]);
            if ($validatedData) {
                $shortUrl = new ShortUrl();
                $shortUrl->user_id = auth()->id();
                $shortUrl->original_url = $validatedData['original_url'];
                $shortUrl->generateShortUrl();
                $shortUrl->status = 'active';
                $shortUrl->save();
            }
        } catch (Exception $e) {
            Log::debug($e->getMessage());
            response()->json($e->getMessage(), 400);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'original_url' => 'required',
            ]);
            if ($validatedData) {
                $shortUrl = ShortUrl::findOrFail($id);
                $shortUrl->user_id = auth()->id();
                if ($shortUrl->original_url !== $validatedData['original_url']) {
                    $shortUrl->original_url = $validatedData['original_url'];
                    $shortUrl->generateShortUrl();
                }
                $shortUrl->status = $request->status;
                $shortUrl->save();
            }
        } catch (Exception $e) {
            Log::debug($e->getMessage());
            response()->json($e->getMessage(), 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
