------- INITIALIZE ENVIROMENT ------------
python -m venv env


-- ACTIVATE --
./env/Scripts/activate

--- INSTALL DEPENDENCIES ---
pip install -r requirements.txt

--- DB ----
py manage.py makemigrations
py manage.py migrate

--- SERVER ---
py manage.py runserver


----------- URLS -----------
http://127.0.0.1:8000/api/metrica-corazon/

http://127.0.0.1:8000/web/pulsaciones/
