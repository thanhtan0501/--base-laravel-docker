<?php

namespace App\Http\Controllers;

use App\Http\Resources\RoleResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response|\Inertia\ResponseFactory
    {
        try {
            $request->validate([
                'field'     => Rule::in(['email', 'updated_at', 'created_at', 'full_name']),
                'direction' => Rule::in(['asc', 'desc']),
            ]);

            // \DB::connection()->enableQueryLog();

            $limit = $request->input('limit', default: 10);
            $users = UserResource::collection(
                User::query()
                    ->when(
                        value: $request->search,
                        callback: fn($query, $value) => $query
                            ->where('full_name', 'like', '%' . $value . '%')
                            ->orWhere('email', 'like', '%' . $value . '%')
                    )
                    ->when(
                        value: $request->field && $request->direction,
                        callback: fn($query) => $query->orderBy($request->field, $request->direction),
                        default: fn($query) => $query->latest()
                    )
                    ->whereNot("id", auth()->id())
                    ->select(['id', 'full_name', 'email', 'created_at'])
                    ->with(['roles:roles.id,roles.name'])
                ->paginate($limit)
                    ->withQueryString()
            );
            // $queries = \DB::getQueryLog();
            // dd($queries);


            return inertia(
                "User/Index",
                [
                    'listData' => $users,
                    "state" => $request->only('limit', 'page', 'search', 'field', 'direction')
                ]
            );
        } catch (\Throwable $th) {
            // throw $th;

            return inertia("User/Index", [
                'listData' => fn() => [],
                'state'      => $request->only('limit', 'page', 'search', 'field', 'direction')
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $data = $request->all();
            $validator = $this->validation($data);
            if (!$validator) {
            }
        } catch (\Throwable $th) {
            //throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        dd($id);
    }
    public function edit(User $user): \Inertia\Response|\Inertia\ResponseFactory
    {
        try {

            return inertia('User/Edit', props: [
                'user'  => new UserResource($user),
            ]);
        } catch (\Exception $e) {
            return inertia('User/Edit', []);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    private function validation($data)
    {
        $validator = Validator::make($data, [
            'email' => 'required'
        ]);
        if ($validator->failed()) {
            return $validator;
        } else {
            return true;
        }
    }
}
