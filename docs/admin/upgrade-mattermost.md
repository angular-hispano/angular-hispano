# Actualización de Mattermost

## Referencias

1. [Actualización de Bitnami Mattermost para GCP](https://docs.bitnami.com/google/apps/mattermost/administration/upgrade/)
1. [Guía de actualización de Mattermost](https://docs.mattermost.com/administration/upgrade.html)
1. [Registro de cambios de Mattermost](https://docs.mattermost.com/administration/changelog.html)

## Configuración del servidor

- Directorio de instalación existente
  - `/opt/bitnami/apps/mattermost`
- Ubicación de su directorio de almacenamiento local
  - `/opt/bitnami/apps/mattermost/data/`
- Configuración de Mattermost
  - `/opt/bitnami/apps/mattermost/server/config/config.json`
- Configuración de Nginx
  - `/opt/bitnami/apps/mattermost/conf/mattermost.conf`

## Detener los servidores

1. Avise al [Canal de Administración](https://chat.angular.lat/default/channels/administracin)
   como temprano en el proceso como sea posible.
1. Avise al [Canal general](https://chat.angular.lat/default/channels/town-square)
   que va a quitar el servidor para realizar una actualización.
1. `sudo /opt/bitnami/ctlscript.sh stop`

## Copia de seguridad de archivos en Google Cloud Storage (GCS)

1. Haga una copia de seguridad de `config.json`
   ```bash
   gsutil cp /opt/bitnami/apps/mattermost/server/config/config.json gs://angular-latino.appspot.com/mattermost-backups/5.9.0/
   ```
1. Crea un tarball de la pila completa de Bitnami (Mattermost, Nginx, MySQL)
   ```bash
   sudo tar -pczvf ~/mattermost-mysql-nginx-5.9.0-backup.tar.gz /opt/bitnami
   ```
1. Mueve el tarball a GCS
   ```bash
   gsutil cp mattermost-mysql-nginx-5.9.0-backup.tar.gz gs://angular-latino.appspot.com/mattermost-backups/5.9.0/
   ```

## Haz la actualización

### Descargue la última versión de Mattermost

- `cd /opt/bitnami/apps/mattermost/`
- `sudo wget https://releases.mattermost.com/5.12.1/mattermost-team-5.12.1-linux-amd64.tar.gz`

### Eliminar archivos anteriores de Mattermost

Asegúrese de que ya estaban respaldados en los pasos anteriores.

- `sudo rm -rf /opt/bitnami/apps/mattermost/server/*`

### Descomprime la nueva versión

```bash
sudo tar xzf mattermost-team-5.12.1-linux-amd64.tar.gz -C /opt/bitnami/apps/mattermost/server --strip-components=1
```

### Haga una copia de seguridad de la configuración y restaure la configuración anterior

1. Haga una copia de seguridad de la configuración predeterminada
   ```bash
   sudo mv /opt/bitnami/apps/mattermost/server/config/config.json /opt/bitnami/apps/mattermost/server/config/default.json
   ```
1. Restaurar la configuración anterior
   ```bash
   sudo gsutil cp gs://angular-latino.appspot.com/mattermost-backups/5.9.0/config.json config.json
   ```
1. Ajustar permisos de archivo
   ```bash
   sudo chown -R root:root /opt/bitnami/apps/mattermost/server
   sudo touch /opt/bitnami/apps/mattermost/server/logs/mattermost.log
   sudo chown -R bitnami:mattermost /opt/bitnami/apps/mattermost/server/logs
   sudo chmod g+w /opt/bitnami/apps/mattermost/server/logs/mattermost.log
   sudo chown -R bitnami:mattermost /opt/bitnami/apps/mattermost/server/client/
   sudo chmod -R g+w /opt/bitnami/apps/mattermost/server/client/
   ```
1. Establezca el propietario de `config.json` en`mattermost` para que la consola del sistema pueda
   realizar cambios
   ```bash
   sudo chown mattermost config.json
   ```

### Reiniciar Mattermost, Nginx, y MySQL

1. `sudo /opt/bitnami/ctlscript.sh start`
1. Verifique que la página "Acerca de Mattermost" enumere la versión que instaló

#### Actualice el archivo `config.json` para incluir los campos de la nueva versión

1. Abra la consola del sistema y cambie una configuración, luego revísela.
      Esto debería habilitar el botón Guardar para esa página
1. Haga clic en Guardar
1. Actualiza la página

Su configuración actual se conserva y se agregan nuevas configuraciones con valores predeterminados.

### Limpiar

- Eliminar el archivo de la nueva versión
  ```bash
  sudo rm /opt/bitnami/apps/mattermost/mattermost-team-5.12.1-linux-amd64.tar.gz
  ```
- Una vez que haya verificado que la copia de seguridad se copió correctamente al depósito de GCS,
  elimine la copia local del archivo
  ```bash
  rm ~/mattermost-mysql-nginx-5.9.0-backup.tar.gz
  ```

### Prueba la nueva versión

1. Revise la nueva configuración `config.json` de la nueva versión
1. Actualice la configuración según corresponda
1. Pruebe algunas de las nuevas funciones mencionadas en el
      [registro de cambios](https://docs.mattermost.com/administration/changelog.html)
1. Verifique que los diferentes clientes estén trabajando

- Web
- Escritorio
- Android
- iOS

### Notificaciones de servidor activo

1. Infórmele al [canal de Administración](https://chat.angular.lat/default/channels/administracin)
      cuando el servidor vuelve a estar en línea. También hágales saber sobre cualquier problema que
   haya encontrado o importante ajustes que fueron cambiados.
1. Notifique el [Canal General](https://chat.angular.lat/default/channels/town-square) cuando todos
      La verificación está completa. También hágales saber acerca de las principales características
   nuevas que puedan afectarlos.

## Solución de problemas

1. Si las imágenes de vista previa del enlace no se cargan, verifique que `config.json` tenga lo
   siguiente y no un Dirección IP:
       - `" SiteURL ":" https://chat.angular.lat ",`
1. Si los emojis se muestran como `????????`, verifique que el `"" SqlSettings "` en `config.json`
   incluya el conjunto de caracteres `utf-8` en `"DataSource"`:
       - `? charset = utf8mb4, utf8`
1. Si http://chat.angular.lat no se reenvía correctamente, vea la solución en
      [#80](https://github.com/angular-hispano/angular-hispano/issues/80)

## Complementos

Los complementos preempaquetados que utilizamos están en estos repositorios

- [GitHub](https://github.com/mattermost/mattermost-plugin-github/releases)
- [Matterpoll](https://github.com/matterpoll/matterpoll/releases)

No utilizamos complementos no preempaquetados en este momento. Por lo tanto, no hay migración de
plugins ni actualizaciones requerido fuera del proceso normal de actualización de Mattermost.
