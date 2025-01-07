<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

abstract class BaseResource extends JsonResource
{
    protected array $fields = [];
    protected bool $withTimestamps = true;

    /**
     * Create a new resource instance with specified fie
     * @param mixed $resource
     * @param array|null $field
     * @param bool $withTimestamps
     * @return void
     */
    public function __construct($resource, array $fields = [], bool $withTimestamps = true)
    {
        parent::__construct($resource);
        $this->fields = is_array($fields) ? $fields : [];
        $this->withTimestamps = $withTimestamps;
    }

    /**
     * Static method to create collection with specified fields
     * @param mixed $resource
     * @param array $field
     * @param bool $withTimestamps
     * @return AnonymousResourceCollection
     */
    public static function collection($resource, array $fields = [], bool $withTimestamps = true): AnonymousResourceCollection
    {
        try {
            $collectionClass = static::class;

            if ($resource instanceof \Illuminate\Pagination\AbstractPaginator) {
                $items = $resource->getCollection();

                $mappedItems = $items->map(function ($item) use ($fields, $withTimestamps) {
                    return new static($item, $fields, $withTimestamps);
                });
                $resource->setCollection($mappedItems);

                return new AnonymousResourceCollection($resource, $collectionClass);
            } else {
                $collection = collect($resource)->map(function ($item) use ($fields, $withTimestamps) {
                    return new static($item, $fields, $withTimestamps);
                });

                return new AnonymousResourceCollection($collection, $collectionClass);
            }
        } catch (\Exception $exception) {
            \Illuminate\Support\Facades\Log::info($exception);
            throw $exception;
        }
    }

    /**
     * Create a new collection with list view settings (minimal field)
     * @param mixed $resource
     * @return AnonymousResourceCollection
     */
    public static function list($resource)
    {
        return static::collection($resource, static::getListFields());
    }
    /**
     * Get the default fields for list view
     * Overwrite this in child classes to define default list fields
     * @return array
     */
    protected static function getListFields(): array
    {
        return ['id', 'created_at', 'updated_at'];
    }

    /**
     * Get common timestamp fields
     * @return array
     */
    protected function getTimestampFields(): array
    {
        return [
            'created_at'     => fn() => $this->created_at,
            'updated_at'     => fn() => $this->updated_at,
            // "created_by" => fn() => $this->created_at?->diffForHumans(),
            // "updated_by" => fn() => $this->updated_at?->diffForHumans(),
        ];
    }

    /**
     * Define the field mappings for the resource
     * Must be implemented by child classes
     * @return array
     */
    abstract protected function getFieldMappings(): array;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $fieldMappings = $this->getFieldMappings();
        if ($this->withTimestamps) {
            $fieldMappings = array_merge($fieldMappings, $this->getTimestampFields());
        }

        if (empty($this->fields)) {
            return array_map(fn($mapper) => $mapper(), $fieldMappings);
        }
        return array_reduce($this->fields, function ($result, $field) use ($fieldMappings) {
            if (isset($fieldMappings[$field])) {
                $result[$field] = $fieldMappings[$field]();
            }

            return $result;
        }, []);
    }
}
