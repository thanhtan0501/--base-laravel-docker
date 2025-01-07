FROM php:8.3-fpm-alpine

# Set working directory
WORKDIR /var/www/html

# Update package list and install dependencies
RUN apk add --no-cache \
    oniguruma-dev \
    libxml2-dev \
    libpng-dev \
    libpq-dev \
    libzip-dev \
    zip \
    unzip \
    supervisor \
    && docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd zip

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Install Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY /composer.*.lock /var/www/html/
COPY /composer.*.lock /var/www/html/
COPY /package-lock.*.json /var/www/html/
COPY /package-lock.*.json /var/www/html/

RUN chown -R www-data:www-data /var/www/html

RUN mkdir -p /var/log/supervisor && \
    mkdir -p /var/run && \
    chown root:root /var/log/supervisor /var/run

COPY start-container /usr/local/bin/start-container
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY php.ini /usr/local/etc/php/conf.d/dym.ini
RUN chmod +x /usr/local/bin/start-container

EXPOSE 80/tcp 5173

ENTRYPOINT ["start-container"]