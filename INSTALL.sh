#!/bin/bash

echo "#!/usr/bin/env xdg-open
[Desktop Entry]
Version=1.0
Type=Application
Name=Hachidori
GenericName=Desktop Widget
Exec=/home/$USER/.hachidori/Hachidori --disable-gpu --enable-transparent-visuals
Terminal=false
Icon=/home/$USER/.hachidori/hachidori.png
StartupNotify=true
" > hachidori.desktop

sudo mv hachidori.desktop /usr/share/applications/
mkdir ~/.hachidori
mv * ~/.hachidori/