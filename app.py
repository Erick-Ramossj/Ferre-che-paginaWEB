from flask import Flask, render_template, url_for ,request,jsonify , redirect
from db import get_connection 

app = Flask(__name__)

@app.route('/')
def home():
    return redirect(url_for('index'))

@app.route('/index')
def index():
    return render_template("index.html", active_page="index")

@app.route("/producto")
def producto():
    return render_template("producto.html", active_page="producto")

@app.route("/catalogo")
def catalogo():
    return render_template("catalogo.html", active_page="catalogo")

@app.route("/marcas")
def marcas():
    return render_template("marcas.html", active_page="marcas")

@app.route("/nosotros")
def nosotros():
    imagenes = [
        {"src": url_for('static', filename='image/fe1.png'), "titulo": "Ropa que Enamora", "descripcion": "Colecciones diseñadas para destacar tu feminidad en cada ocasión especial."},
        {"src": url_for('static', filename='image/imagen2.png'), "titulo": "Tu Estilo, Tu Fuerza", "descripcion": "Outfits versátiles que combinan comodidad y moda para mujeres seguras de sí mismas."},
        {"src": url_for('static', filename='image/imagen3.png'), "titulo": "Noches de Glamour", "descripcion": "Brilla con prendas únicas que transforman cada salida en un momento inolvidable."},
        {"src": url_for('static', filename='image/imagen4.png'), "titulo": "Casual con Estilo", "descripcion": "Looks frescos y cómodos pensados para acompañarte en tu día a día sin perder elegancia."},
        {"src": url_for('static', filename='image/imagen5.png'), "titulo": "Elegancia Urbana", "descripcion": "Descubre outfits modernos que realzan tu personalidad con un toque sofisticado para el día a día."},
        {"src": url_for('static', filename='image/imagen6.png'), "titulo": "Poder Femenino", "descripcion": "Moda ideal para mujeres profesionales que buscan proyectar seguridad y estilo en cada paso."},
        {"src": url_for('static', filename='image/python.png'), "titulo": "Tendencias que Inspiran", "descripcion": "Descubre lo último en moda femenina con diseños exclusivos que marcan diferencia."}
    ]
    return render_template("nosotros.html", imagenes=imagenes, active_page="nosotros")

@app.route("/contacto")
def contacto():
    return render_template("contacto.html", active_page="contacto")
@app.route('/formulario')
def formulario():
    return render_template('formulario.html')

@app.route('/carrito')
def carrito():
    return render_template('carrito.html')

@app.route('/micuenta')
def micuenta():
    return render_template('micuenta.html')

@app.route('/libroRecl')
def libroRecl():
    return render_template("libroRecl.html")

@app.route('/usuario')
def usuario():
    return render_template("usuario.html")

# Ruta de prueba de conexión
@app.route('/test-db')
def test_db():
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT DATABASE();")
        db_name = cursor.fetchone()[0]
        cursor.close()
        conn.close()
        return f"✅ Conexión exitosa a la base de datos: {db_name}"
    except Exception as e:
        return f"❌ Error al conectar: {e}"


@app.route('/registrar_usuario', methods=['POST'])
def registrar_usuario():
    correo = request.form.get('correo')
    nombre_apellidos = request.form.get('nombre_apellidos')
    profesion = request.form.get('profesion')
    tipo_documento = request.form.get('tipo_documento')
    celular = request.form.get('celular')
    contrasena = request.form.get('contrasena')
    confirmar = request.form.get('confirmar_contrasena')

    # Validar contraseñas iguales
    if contrasena != confirmar:
        print("⚠️ Las contraseñas no coinciden")
        return redirect(url_for('formulario'))

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO usuarios (correo, nombre_apellidos, profesion, tipo_documento, celular, contrasena)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (correo, nombre_apellidos, profesion, tipo_documento, celular, contrasena))
        conn.commit()
        print("✅ Usuario registrado correctamente")
    except Exception as e:
        conn.rollback()
        print("❌ Error al registrar usuario:", e)
    finally:
        cursor.close()
        conn.close()

    return redirect(url_for('formulario'))


@app.route('/registrar_empresa', methods=['POST'])
def registrar_empresa():
    correo = request.form.get('correo')
    razon_social = request.form.get('razon_social')
    direccion = request.form.get('direccion')
    tipo_empresa = request.form.get('tipo_empresa')
    ruc = request.form.get('ruc')
    celular = request.form.get('celular')
    contrasena = request.form.get('contrasena')
    confirmar = request.form.get('confirmar_contrasena')

    # Validar contraseñas iguales
    if contrasena != confirmar:
        print("⚠️ Las contraseñas no coinciden")
        return redirect(url_for('formulario'))

    conn = get_connection()
    cursor = conn.cursor()

    try:
        cursor.execute("""
            INSERT INTO empresas (correo, razon_social, direccion, tipo_empresa, ruc, celular, contrasena)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
        """, (correo, razon_social, direccion, tipo_empresa, ruc, celular, contrasena))
        conn.commit()
        print("✅ Empresa registrada correctamente")
    except Exception as e:
        conn.rollback()
        print("❌ Error al registrar empresa:", e)
    finally:
        cursor.close()
        conn.close()

    return redirect(url_for('formulario'))

if __name__ == "__main__":
    app.run(debug=True)
