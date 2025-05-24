# API Sistema de Gestión de Casos de Violencia

## 📋 Descripción
API RESTful para la gestión de casos de violencia, permitiendo el registro y seguimiento de víctimas, agresores, denuncias y recursos de apoyo.

## 🚀 Características
- Gestión de víctimas y agresores
- Registro y seguimiento de casos
- Control de denuncias
- Seguimiento de casos
- Gestión de recursos de apoyo
- Autenticación y autorización de usuarios
- Sistema de roles (admin, profesional, víctima)

## 🛠️ Tecnologías
- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)
- bcrypt.js
- Docker

## 📝 Endpoints

### Autenticación
```http
POST /api/auth/register     # Registro de usuarios
POST /api/auth/login       # Inicio de sesión
```

### Víctimas
```http
GET    /api/victimas       # Obtener todas las víctimas
GET    /api/victimas/:id   # Obtener víctima por ID
POST   /api/victimas       # Crear nueva víctima
PUT    /api/victimas/:id   # Actualizar víctima
DELETE /api/victimas/:id   # Eliminar víctima
```

### Agresores
```http
GET    /api/agresores       # Obtener todos los agresores
GET    /api/agresores/:id   # Obtener agresor por ID
POST   /api/agresores       # Crear nuevo agresor
PUT    /api/agresores/:id   # Actualizar agresor
DELETE /api/agresores/:id   # Eliminar agresor
```

### Casos
```http
GET    /api/casos                    # Obtener todos los casos
GET    /api/casos/:id                # Obtener caso por ID
GET    /api/casos/victima/:victimaId # Obtener casos por víctima
GET    /api/casos/agresor/:agresorId # Obtener casos por agresor
POST   /api/casos                    # Crear nuevo caso
PUT    /api/casos/:id                # Actualizar caso
DELETE /api/casos/:id                # Eliminar caso
```

### Denuncias
```http
GET    /api/denuncias           # Obtener todas las denuncias
GET    /api/denuncias/:id       # Obtener denuncia por ID
GET    /api/denuncias/caso/:id  # Obtener denuncias por caso
POST   /api/denuncias           # Crear nueva denuncia
PUT    /api/denuncias/:id       # Actualizar denuncia
DELETE /api/denuncias/:id       # Eliminar denuncia
```

### Seguimientos
```http
GET    /api/seguimientos           # Obtener todos los seguimientos
GET    /api/seguimientos/:id       # Obtener seguimiento por ID
GET    /api/seguimientos/caso/:id  # Obtener seguimientos por caso
POST   /api/seguimientos           # Crear nuevo seguimiento
PUT    /api/seguimientos/:id       # Actualizar seguimiento
DELETE /api/seguimientos/:id       # Eliminar seguimiento
```

### Recursos
```http
GET    /api/recursos           # Obtener todos los recursos
GET    /api/recursos/:id       # Obtener recurso por ID
GET    /api/recursos/caso/:id  # Obtener recursos por caso
POST   /api/recursos           # Crear nuevo recurso
PUT    /api/recursos/:id       # Actualizar recurso
DELETE /api/recursos/:id       # Eliminar recurso
```

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/pelu29/proyect_social.git
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear archivo `.env` con:
```env
DB_HOST=tu_host
DB_PORT=tu_puerto
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_de_datos
JWT_SECRET=tu_clave_secreta
```

4. Iniciar el servidor:
```bash
npm start
```

## 🐳 Docker

Para ejecutar con Docker:

```bash
# Construir imagen
docker build -t api-social .

# Ejecutar contenedor
docker run -p 3000:3000 api-social
```

## 🔐 Autenticación

La API utiliza JWT para la autenticación. Para acceder a las rutas protegidas:

1. Obtener token mediante login
2. Incluir token en header:
```http
Authorization: Bearer <tu-token>
```

## 👥 Roles de Usuario
- `admin`: Acceso total
- `profesional`: Gestión de casos y seguimientos
- `victima`: Acceso limitado a su información

## 📄 Licencia
[Tu tipo de licencia]

## ✍️ Autor
Darwin Flores