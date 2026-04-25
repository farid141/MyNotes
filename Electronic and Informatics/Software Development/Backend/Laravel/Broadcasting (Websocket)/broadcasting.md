# Penjelasan

Konsep: Tidak perlu reload page untuk mendapatkan data terbaru, melainkan lewat websocket. Bisa juga dipasangkan dengan notifications.

## Prerequisits

- pemahaman event-listener
- pemahaman queue

## Setup

### FE

- install package: `npm install --save-dev laravel-echo pusher-js`
- Uncomment konfigurasi broadcast pada `resources/js/bootstrap.js`

Driver BE yang tersedia:
 Laravel Reverb, Pusher Channels, Ably, and a log

### Backend

1. `php artisan install:broadcasting` :
    - otomatis install FE laravel-echo dan pusher-js
    - membuat konfigurasi echo resources/js/echo.js

2. `composer require laravel/reverb`
3. `php artisan reverb:install`

## Usage in BE (Laravel Code)

1. implmentasikan shouldBroadcast pada event yang didispatch:
    `class OrderShipmentStatusUpdated implements ShouldBroadcast`
2. setup channel yang dibroadcast

    ```php
    public function broadcastOn(): Channel{
        return new PrivateChannel('orders.'.$this->order->id);
    }
    ```

3. Gunakan autorisasi untuk mengakses websocket, karena privateChannel harus login

```php
Broadcast::channel('orders.{orderId}', function (User $user, int $orderId) {
    return $user->id === Order::findOrNew($orderId)->user_id;
});
```

## Usage in FE (JS Code)

```php
Echo.private(`orders.${orderId}`)
.listen('OrderShipmentStatusUpdated', (e) => {
    console.log(e.order);
});
```
