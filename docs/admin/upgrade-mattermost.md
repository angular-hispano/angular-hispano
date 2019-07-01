# Upgrading Mattermost

## References
1. [Upgrading Bitnami Mattermost for GCP](https://docs.bitnami.com/google/apps/mattermost/administration/upgrade/)
1. [Mattermost Upgrade Guide](https://docs.mattermost.com/administration/upgrade.html)
1. [Mattermost Release Changelog](https://docs.mattermost.com/administration/changelog.html)

## Server Configuration

- Existing install directory
  - `/opt/bitnami/apps/mattermost`
- Location of your local storage directory
  - `/opt/bitnami/apps/mattermost/data/`
- Mattermost configuration
  - `/opt/bitnami/apps/mattermost/server/config/config.json`
- Nginx configuration
  - `/opt/bitnami/apps/mattermost/conf/mattermost.conf`

## Stop the servers

1. Warn the [Administración channel](https://chat.angular.lat/default/channels/administracin) as
  early in the process as possible.
1. Warn the [General channel](https://chat.angular.lat/default/channels/town-square) that you are
  taking the server down to perform an upgrade.
1. `sudo /opt/bitnami/ctlscript.sh stop`

## Backup Files to Google Cloud Storage (GCS)

1. Backup the `config.json`
    ```bash
    gsutil cp /opt/bitnami/apps/mattermost/server/config/config.json gs://angular-latino.appspot.com/mattermost-backups/5.9.0/
    ```
1. Create a tarball of the full Bitnami Stack (Mattermost, Nginx, MySQL)
    ```bash
    sudo tar -pczvf ~/mattermost-mysql-nginx-5.9.0-backup.tar.gz /opt/bitnami
    ```
1. Backup the tarball to GCS
    ```bash
    gsutil cp mattermost-mysql-nginx-5.9.0-backup.tar.gz gs://angular-latino.appspot.com/mattermost-backups/5.9.0/
    ```

## Do the Upgrade

### Download the latest version of Mattermost

- `cd /opt/bitnami/apps/mattermost/`
- `sudo wget https://releases.mattermost.com/5.12.1/mattermost-team-5.12.1-linux-amd64.tar.gz`

### Remove previous Mattermost files
Ensure they were already backed up in previous steps.

- `sudo rm -rf /opt/bitnami/apps/mattermost/server/*`

### Uncompress the new version

```bash
sudo tar xzf mattermost-team-5.12.1-linux-amd64.tar.gz -C /opt/bitnami/apps/mattermost/server --strip-components=1
```

### Backup the Config and Restore the previous Config

1. Backup the default config
    ```bash
    sudo mv /opt/bitnami/apps/mattermost/server/config/config.json /opt/bitnami/apps/mattermost/server/config/default.json
    ```
1. Restore the previous config
    ```bash
    sudo gsutil cp gs://angular-latino.appspot.com/mattermost-backups/5.9.0/config.json config.json
    ```
1. Adjust file permissions
    ```bash
    sudo chown -R root:root /opt/bitnami/apps/mattermost/server
    sudo touch /opt/bitnami/apps/mattermost/server/logs/mattermost.log
    sudo chown -R bitnami:mattermost /opt/bitnami/apps/mattermost/server/logs
    sudo chmod g+w /opt/bitnami/apps/mattermost/server/logs/mattermost.log
    sudo chown -R bitnami:mattermost /opt/bitnami/apps/mattermost/server/client/
    sudo chmod -R g+w /opt/bitnami/apps/mattermost/server/client/
    ```
1. Set the `config.json`'s owner to `mattermost` so that the System Console can make changes
    ```bash
    sudo chown mattermost config.json
    ```

### Restart Mattermost, Nginx, and MySQL

1. `sudo /opt/bitnami/ctlscript.sh start`
1. Verify that the "Acerca de Mattermost" page lists the version that you installed

#### Update the `config.json` file to include the fields from the new version

1. Open the System Console and change a setting, then revert it
  This should enable the Save button for that page
1. Click Save
1. Refresh the page

Your current settings are preserved, and new settings are added with default values.

### Clean Up

- Remove new version archive
    ```bash
    sudo rm /opt/bitnami/apps/mattermost/mattermost-team-5.12.1-linux-amd64.tar.gz
    ```
- After you've verified that the backup was successfully copied to the GCS bucket, delete the local
  copy of the file
    ```bash
    rm ~/mattermost-mysql-nginx-5.9.0-backup.tar.gz
    ```

### Test the new version

1. Review the new `config.json` settings from the new release
1. Update settings as appropriate
1. Test out some of the new features mentioned in the
  [changelog](https://docs.mattermost.com/administration/changelog.html)
1. Verify that the different clients are working
  - Web
  - Desktop
  - Android
  - iOS

### Server Up Notifications

1. Let the [Administración channel](https://chat.angular.lat/default/channels/administracin) know
  when the server is back online. Also let them know about any issues that you ran into or important
  settings that were changed.
1. Notify the [General channel](https://chat.angular.lat/default/channels/town-square) when all
  verification is complete. Also let them know about any major new features that may effect them.


## Troubleshooting

1. If link preview images fail to load, verify that the `config.json` has the following and not an
  IP address:
    - `"SiteURL": "https://chat.angular.lat",`
1. If emojis render as `????????`, check that the `"SqlSettings"` in `config.json` includes
  the `utf-8` charset in `"DataSource"`:
    - `?charset=utf8mb4,utf8`


## Plugins

The prepackaged plugins we use are in these repositories
- [GitHub](https://github.com/mattermost/mattermost-plugin-github/releases)
- [Matterpoll](https://github.com/matterpoll/matterpoll/releases)

We do not use any non-prepackaged plugins at this time. So no plugin migration or upgrades are
required outside of the normal Mattermost upgrade process.
