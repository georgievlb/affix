FROM nginx

COPY Affix.ReverseProxy/nginx.local.conf /etc/nginx/nginx.conf
COPY Affix.ReverseProxy/is-local.crt /etc/ssl/certs/local.is.affix.com.crt
COPY Affix.ReverseProxy/is-local.key /etc/ssl/private/local.is.affix.com.key

COPY Affix.ReverseProxy/api-local.crt /etc/ssl/certs/local.api.affix.com.crt
COPY Affix.ReverseProxy/api-local.key /etc/ssl/private/local.api.affix.com.key