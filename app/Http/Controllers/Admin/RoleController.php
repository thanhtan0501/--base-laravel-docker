<?php

namespace App\Http\Controllers\Admin;

use App\Enums\Status;
use App\Http\Controllers\Controller;
use App\Http\Resources\PermissionResource;
use App\Http\Resources\RoleResource;
use BenSampo\Enum\Rules\EnumValue;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response|\Inertia\ResponseFactory
    {
        try {
            $request->validate([
                'field'     => Rule::in(['updated_at', 'created_at', 'name', 'status']),
                'direction' => Rule::in(['asc', 'desc']),
            ]);
            $limit = $request->input('limit', default: 10);
            $roles = RoleResource::collection(
                Role::query()
                    ->when(
                        value: $request->search,
                        callback: fn($query, $value) => $query
                            ->where('name', 'like', '%' . $value . '%')
                    )
                    ->when(
                        value: $request->field && $request->direction,
                        callback: fn($query) => $query->orderBy($request->field, $request->direction),
                        default: fn($query) => $query->orderBy("id", "asc")->latest()
                    )
                    ->select(['id', 'name', 'status', 'updated_at', 'created_at'])
                    ->with(['permissions:permissions.id,permissions.name'])
                    ->paginate($limit)
                    ->withQueryString()
            );
            return inertia(
                "Role/Index",
                [
                    'listData' => $roles,
                    "state" => $request->only('limit', 'page', 'search', 'field', 'direction')
                ]
            );
        } catch (\Throwable $th) {
            return inertia("Role/Index", [
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
            $request->validate([
                'name' => 'required|string|max:255|unique:roles'
            ]);
            $role = Role::create($request->all());
            if ($request->has('permissions')) {
                $permissions = Permission::whereIn('id', $request->permissions)->get();
                $role->syncPermissions($permissions);
            }
            return redirect()->route('admin.role')->with('success', 'Role created successfully');
        } catch (\Exception $exception) {
            DB::rollBack();
            throw $exception;
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
    public function update(Request $request, Role $role)
    {
        $validate = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
            'status' => ['required', new EnumValue(Status::class)],
            "permissions" => "nullable|array",
            "permissions.*" => "exists:permissions,id",
        ]);
        try {
            DB::beginTransaction();
            $role->update($validate);

            if ($request->has('permissions')) {
                $permissions = Permission::whereIn('id', $request->permissions)->get();
                $role->syncPermissions($permissions);
            }
            $role->touch();
            DB::commit();
            return redirect()->route('admin.role')->with('success', 'Role updated successfully');
        } catch (\Exception $exception) {
            DB::rollBack();
            throw $exception;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        try {
            DB::beginTransaction();
            $role->delete();
            DB::commit();
            return redirect()->route('admin.role')->with('success', 'Role deleted successfully');
        } catch (\Exception $exception) {
            DB::rollBack();
            return back()->withErrors(['messages' => $exception->getMessage()]);
        }
    }
    public function edit(Role $role): \Inertia\Response|\Inertia\ResponseFactory
    {
        try {
            return inertia('Role/Edit', props: [
                'role'  => new RoleResource($role),
                'permissions'  => PermissionResource::collection(Permission::where('status', Status::ACTIVE)->get()),
            ]);
        } catch (\Exception $exception) {
            return inertia('Role/Edit', []);
        }
    }
    public function create(): \Inertia\Response|\Inertia\ResponseFactory
    {
        try {
            return inertia('Role/Create', props: [
                'permissions'  => PermissionResource::collection(Permission::where('status', Status::ACTIVE)->get()),
            ]);
        } catch (\Exception $e) {
            return inertia('Role/Create', []);
        }
    }
}
