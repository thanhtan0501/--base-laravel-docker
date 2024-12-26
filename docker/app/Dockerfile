FROM php:8.3

# Set working directory
WORKDIR /var/www/html

# Update package list and install dependencies
RUN apt-get update && apt-get install -y \ 
    libpng-dev \
    libpq-dev \
    libonig-dev \
    libzip-dev \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd zip

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN chown -R www-data:www-data /var/www/html

CMD php /var/www/html/artisan serve --host="0.0.0.0" --port=8080

EXPOSE 80/tcp
