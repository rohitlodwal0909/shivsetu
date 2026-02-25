@echo off
echo Creating directory public\images\puja...
if not exist "public\images\puja" mkdir "public\images\puja"

echo Downloading Puja Package Images...

echo Downloading One Member Image...
curl "https://images.unsplash.com/photo-1582236166164-98ce21e5e6bd?q=80&w=800&auto=format&fit=crop" -o "public\images\puja\one-member.jpg"

echo Downloading Two Members Image...
curl "https://images.unsplash.com/photo-1620608937554-b433433ca17f?q=80&w=800&auto=format&fit=crop" -o "public\images\puja\two-members.jpg"

echo Downloading Four Members Image...
curl "https://images.unsplash.com/photo-1609102434316-2c5e13dcc028?q=80&w=800&auto=format&fit=crop" -o "public\images\puja\four-members.jpg"

echo Downloading Six Members Image...
curl "https://images.unsplash.com/photo-1561336829-0639912c9b4f?q=80&w=800&auto=format&fit=crop" -o "public\images\puja\six-members.jpg"

echo.
echo All images downloaded successfully to public\images\puja\
pause
