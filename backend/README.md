# **:triangular_flag_on_post: HOSPITAL SOFTWARE** (version 1.0.0)

![node version](https://img.shields.io/badge/node->=14.0.0-brightgreen.svg)

> A restful api that calculates overstay fees for hospital bookings.

## Visit [hospitalsoftware.herokuapp.com](https://hospitalsoftware.herokuapp.com/reservation) to test the live api!

## **:package: Tools used**

- [x] NodeJS
- [x] Express
- [x] Typescipt
- [x] TypeORM
- [x] PostGres

---

## **:wrench: Developer usage**

### **Set up project**

Before cloning the repo **be sure** you have installed:

- [**NODE**](https://www.google.com/search?q=how+to+install+node) (version >=14.0.0)
- PostGres

Then:

- Choose a folder project in your system and switch in `cd [folder path]`
- Clone the repo in your folder path `git clone https://github.com/lancerdonnie/HospitalSoftware.git`
- Create a '.env' file following the '.env.example' template

---

### **Installation**

In order to install the project and all dependencies, enter in the project folder and run `npm install`

---

### Start:Development

```bash
npm run migration:run
npm run dev
```

---

---

### Start:Production

```bash
npm run build && npm start
```

---

---

### Build

```bash
npm run build
```

---

---

### Test

```bash
npm test
```

Additionally, to use the test.rest file, only if using vscode, install REST Client extension by Huachao Mao

---

---

### Docker

```bash
docker build -t {imagename} .
docker run -d -p 8080:5000 --name {name} {imagename}
```

- Open on http://localhost

---

---

## **:handshake: Contributing**

- Fork it!
- Create your feature branch: `git checkout -b my-new-feature`
- Commit your changes: `git commit -am 'Add some feature'`
- Push to the branch: `git push origin my-new-feature`
- Submit a pull request

---

### **:heart: Show your support**

Please :star: this repository if you like it or this project helped you!\
Feel free to open issues or submit pull-requests to help me improving my work.

---

### **:robot: Author**

_*Adedeji Babajide*_

---

Copyright © 2021 Adedeji Babajide
