from flask import Flask, render_template ,request, jsonify,url_for
import os

# Inicializar de mi framework flask
app = Flask(__name__)

#rutas
@app.route("/")
def index():
    imagenes = [
        {
            "src": url_for('static', filename='image/imagen1.png'),
            "titulo": "Ropa que Enamora",
            "descripcion": "Colecciones diseñadas para destacar tu feminidad en cada ocasión especial."
        },
        {
            "src": url_for('static', filename='image/imagen2.png'),
            "titulo": "Tu Estilo, Tu Fuerza",
            "descripcion": "Outfits versátiles que combinan comodidad y moda para mujeres seguras de sí mismas."
        },
        {
            "src": url_for('static', filename='image/imagen3.png'),
            "titulo": "Noches de Glamour",
            "descripcion": "Brilla con prendas únicas que transforman cada salida en un momento inolvidable."
        },
        {
            "src": url_for('static', filename='image/imagen4.png'),
            "titulo": "Casual con Estilo",
            "descripcion": "Looks frescos y cómodos pensados para acompañarte en tu día a día sin perder elegancia."
        },
        {
            "src": url_for('static', filename='image/imagen5.png'),
            "titulo": "Elegancia Urbana",
            "descripcion": "Descubre outfits modernos que realzan tu personalidad con un toque sofisticado para el día a día."
        },
        {
            "src": url_for('static', filename='image/imagen6.png'),
            "titulo": "Poder Femenino",
            "descripcion": "Moda ideal para mujeres profesionales que buscan proyectar seguridad y estilo en cada paso."
        },
        {
            "src": url_for('static', filename='image/python.png'),
            "titulo": "Tendencias que Inspiran",
            "descripcion": "Descubre lo último en moda femenina con diseños exclusivos que marcan diferencia."
        }
    ]
    return render_template("index.html", imagenes=imagenes)

@app.route('/contacto')
def contacto():
    return render_template('contacto.html') 

@app.route('/nosotros')
def nosotros():
    return render_template('nosotros.html')

#ejecutar mi servidor
if __name__ == "__main__":
    app.run(debug=True)
