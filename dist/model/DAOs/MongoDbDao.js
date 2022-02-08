"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbDao = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var usuarios_1 = require("../models/usuarios");
var productos_1 = require("../models/productos");
var carrito_1 = require("../models/carrito");
var order_1 = require("../models/order");
var loggers_1 = require("../../utils/loggers");
var ProductoDto_1 = require("../DTOs/ProductoDto");
var OrdenDto_1 = require("../DTOs/OrdenDto");
var config = require('../../../config.js');
var MongoDbDao = /** @class */ (function () {
    function MongoDbDao() {
        this.MONGO_URL = config.MONGO_URL;
        this.productos = new Array();
        this.carrito = new Array();
        this.order = new Array();
        this.dbConnection = this.conectar();
    }
    MongoDbDao.prototype.conectar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        loggers_1.loggerInfo.info('Base de datos MongoDB conectada!');
                        return [4 /*yield*/, mongoose_1.default.connect(this.MONGO_URL)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        loggers_1.loggerError.error("MongoDB: Error en conectar: " + err_1);
                        throw err_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbDao.prototype.findUser = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, usuarios_1.usuarioModel.findOne({ username: username })];
                    case 1:
                        user = _a.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    MongoDbDao.prototype.getProductoById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var producto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(id !== undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, productos_1.productoModel.findById(id)];
                    case 1:
                        producto = _a.sent();
                        return [2 /*return*/, (0, ProductoDto_1.productoDTOForMongo)(producto)];
                    case 2: return [2 /*return*/, undefined];
                }
            });
        });
    };
    MongoDbDao.prototype.getProductos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var savedProducts, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.productos = [];
                        return [4 /*yield*/, productos_1.productoModel.find({}, { __v: 0, createdAt: 0, updatedAt: 0 })];
                    case 1:
                        savedProducts = _a.sent();
                        savedProducts.forEach(function (producto) {
                            _this.productos.push((0, ProductoDto_1.productoDTOForMongo)(producto));
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _a.sent();
                        loggers_1.loggerError.error(error_1);
                        throw error_1;
                    case 3: 
                    // await mongoose.disconnect();
                    return [2 /*return*/, this.productos];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbDao.prototype.filterProducto = function (filtro, filterBy) {
        return __awaiter(this, void 0, void 0, function () {
            var filtroCapitalized, filtroReg, productosByName, filtroReg, productosByCode, productosByPrecio, productosByStock, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, 10, 11]);
                        this.productos = [];
                        if (!(filterBy === 'nombre')) return [3 /*break*/, 2];
                        filtroCapitalized = new RegExp("^" + filtro[0].charAt(0).toUpperCase() + filtro[0].slice(1));
                        filtroReg = new RegExp("^" + filtro[0]);
                        return [4 /*yield*/, productos_1.productoModel.find({ $or: [{ 'title': filtroReg }, { 'title': filtroCapitalized }] })];
                    case 1:
                        productosByName = _a.sent();
                        productosByName.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        return [3 /*break*/, 8];
                    case 2:
                        if (!(filterBy === 'codigo')) return [3 /*break*/, 4];
                        filtroReg = new RegExp("^" + filtro[0]);
                        return [4 /*yield*/, productos_1.productoModel.find({ 'code': filtroReg })];
                    case 3:
                        productosByCode = _a.sent();
                        productosByCode.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        return [3 /*break*/, 8];
                    case 4:
                        if (!(filterBy === 'precio')) return [3 /*break*/, 6];
                        return [4 /*yield*/, productos_1.productoModel.find({ 'price': { $gte: filtro[0], $lte: filtro[1] } })];
                    case 5:
                        productosByPrecio = _a.sent();
                        productosByPrecio.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        return [3 /*break*/, 8];
                    case 6:
                        if (!(filterBy === 'stock')) return [3 /*break*/, 8];
                        return [4 /*yield*/, productos_1.productoModel.find({ 'stock': { $gte: filtro[0], $lte: filtro[1] } })];
                    case 7:
                        productosByStock = _a.sent();
                        productosByStock.forEach(function (producto) {
                            _this.productos.push(producto);
                        });
                        _a.label = 8;
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        error_2 = _a.sent();
                        loggers_1.loggerError.error(error_2);
                        throw error_2;
                    case 10: return [2 /*return*/, this.productos];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbDao.prototype.insertProducto = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, productos_1.productoModel.insertMany((0, ProductoDto_1.insertUpdateProductoDTOForMongo)(producto))];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_3 = _a.sent();
                        loggers_1.loggerError.error(error_3);
                        throw error_3;
                    case 3:
                        loggers_1.loggerInfo.info('Producto Agregado');
                        return [2 /*return*/, producto];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbDao.prototype.updateProducto = function (id, productoToBeUpdate) {
        return __awaiter(this, void 0, void 0, function () {
            var producto, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        producto = (0, ProductoDto_1.insertUpdateProductoDTOForMongo)(productoToBeUpdate);
                        return [4 /*yield*/, productos_1.productoModel.updateOne({ _id: id }, {
                                $set: producto
                            }, { multi: true })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getProductos()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_4 = _a.sent();
                        loggers_1.loggerError.error(error_4);
                        throw error_4;
                    case 4:
                        loggers_1.loggerInfo.info('Producto modificado', productoToBeUpdate.title);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbDao.prototype.deleteProducto = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, productos_1.productoModel.deleteMany({ _id: id })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getProductos()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_5 = _a.sent();
                        loggers_1.loggerError.error(error_5);
                        throw error_5;
                    case 4:
                        loggers_1.loggerInfo.info('Producto Eliminado');
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbDao.prototype.getCarritoById = function (id) {
        return this.carrito.find(function (element) { return String(element._id) === id; });
    };
    MongoDbDao.prototype.getCarrito = function () {
        return __awaiter(this, void 0, void 0, function () {
            var carritosEnDB, error_6;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        this.carrito = [];
                        return [4 /*yield*/, carrito_1.carritoModel.find({ "cerrado": false }, { __v: 0, createdAt: 0, updatedAt: 0 })];
                    case 1:
                        carritosEnDB = _a.sent();
                        carritosEnDB.forEach(function (cart) {
                            _this.carrito.push(cart);
                        });
                        return [3 /*break*/, 4];
                    case 2:
                        error_6 = _a.sent();
                        loggers_1.loggerError.error(error_6);
                        throw error_6;
                    case 3: 
                    // await mongoose.disconnect();
                    return [2 /*return*/, this.carrito];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbDao.prototype.insertOrder = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var orderTotal, _i, order_2, carrito, orderToSend, adminOrder, clientOrder, i, lastOrderInserted, _id, finalOrder, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, 9, 10]);
                        orderTotal = order.pop();
                        _i = 0, order_2 = order;
                        _a.label = 1;
                    case 1:
                        if (!(_i < order_2.length)) return [3 /*break*/, 4];
                        carrito = order_2[_i];
                        return [4 /*yield*/, carrito_1.carritoModel.updateOne({ $and: [{ "cerrado": false }, { "_id": carrito._id }] }, { $set: { "cerrado": true } })];
                    case 2:
                        _a.sent();
                        delete carrito.cerrado;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [4 /*yield*/, order_1.ordenModel.insertMany({
                            productos: order,
                            orderTotal: orderTotal.orderTotal
                        })];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.getCarrito()];
                    case 6:
                        _a.sent();
                        orderToSend = [];
                        adminOrder = [];
                        clientOrder = [];
                        for (i = 0; i <= order.length - 1; i += 1) {
                            adminOrder.push((0, OrdenDto_1.orderProductoAdminDTO)(order[i]));
                            clientOrder.push((0, OrdenDto_1.orderProductoClientDTO)(order[i]));
                        }
                        return [4 /*yield*/, order_1.ordenModel.find({}, { productos: { producto: { description: 0, thumbnail: 0 } }, __v: 0, createdAt: 0, updatedAt: 0 }).sort({ _id: -1 }).limit(1)];
                    case 7:
                        lastOrderInserted = _a.sent();
                        _id = lastOrderInserted[0]._id;
                        finalOrder = (0, OrdenDto_1.orderFinalDTO)(String(_id), adminOrder, clientOrder, orderTotal.orderTotal);
                        orderToSend.push(finalOrder);
                        return [2 /*return*/, orderToSend];
                    case 8:
                        error_7 = _a.sent();
                        loggers_1.loggerError.error(error_7);
                        throw error_7;
                    case 9: return [7 /*endfinally*/];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbDao.prototype.insertProductToCarrito = function (producto) {
        return __awaiter(this, void 0, void 0, function () {
            var error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, carrito_1.carritoModel.insertMany({
                                quantity: 1,
                                producto: producto
                            })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        error_8 = _a.sent();
                        loggers_1.loggerError.error(error_8);
                        throw error_8;
                    case 3:
                        loggers_1.loggerInfo.info('Producto agregado a carrito', producto.title);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbDao.prototype.updateQtyInCarrito = function (cart) {
        return __awaiter(this, void 0, void 0, function () {
            var carrito, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        carrito = cart._doc;
                        return [4 /*yield*/, carrito_1.carritoModel.updateOne({ $and: [{ "cerrado": false }, { "_id": carrito._id }] }, { $set: { "quantity": carrito.quantity + 1, "producto": cart.producto } })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getCarrito()];
                    case 2:
                        _a.sent();
                        loggers_1.loggerInfo.info('Se agrego un producto similar al mismo carrito', carrito.producto.title);
                        return [3 /*break*/, 5];
                    case 3:
                        error_9 = _a.sent();
                        loggers_1.loggerError.error(error_9);
                        throw error_9;
                    case 4: return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    MongoDbDao.prototype.deleteCarrito = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, 4, 5]);
                        return [4 /*yield*/, carrito_1.carritoModel.deleteMany({ _id: id })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getCarrito()];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_10 = _a.sent();
                        loggers_1.loggerError.error(error_10);
                        throw error_10;
                    case 4:
                        loggers_1.loggerInfo.info('Producto en carrito Eliminado');
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return MongoDbDao;
}());
exports.MongoDbDao = MongoDbDao;
