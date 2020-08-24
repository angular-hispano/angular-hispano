# Renovación del certificado Let's Encrypt

[Documentación oficial](https://certbot.eff.org/docs/using.html#renewing-certificates)

## Configuración del servidor

- Directorio de instalación de Let's Encrypt
  - `/opt/letsencrypt`
- Ubicación del certificado
  - `/etc/letsencrypt/live/chat.angular.lat/fullchain.pem`
- Configuración de Crontab para ejecutar automáticamente el comando de renovación mensualmente
  - `/etc/crontab`
- Configuración de Nginx
  - `/opt/bitnami/apps/mattermost/conf/mattermost.conf`

## Comandos

### Recomendado

Renovar automáticamente todos los certificados utilizando los argumentos originales

```shell script
/opt/letsencrypt/letsencrypt-auto renew --post-hook "sudo /opt/bitnami/ctlscript.sh restart nginx"
```

### Otra opción

Renueve manualmente el certificado para chat.angular.lat

```shell script
/opt/letsencrypt/letsencrypt-auto certonly --reinstall --nginx --nginx-server-root=/opt/bitnami/nginx/conf -d chat.angular.lat &&
 sudo /opt/bitnami/ctlscript.sh restart nginx
```
