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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.getErrors = exports.getMetrics = void 0;
// Imports
var aws_sdk_1 = require("aws-sdk");
var client_sts_1 = require("@aws-sdk/client-sts");
var dotenv = require("dotenv");
dotenv.config();
//OUR PROJECT'S AWS USER CREDENTIALS
var credentials = new aws_sdk_1["default"].Credentials({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});
//STS CLIENT TO ASSUME ROLE
var client = new client_sts_1.STSClient({ region: 'us-east-2', credentials: credentials });
// GET METRICS MIDDLEWARE
var getMetrics = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    function getFunctions() {
        return __awaiter(this, void 0, void 0, function () {
            var logGroups, lambdaFunctions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, cloudwatchlogs.describeLogGroups({ logGroupNamePrefix: '/aws/lambda' }).promise()];
                    case 1:
                        logGroups = (_a.sent()).logGroups;
                        lambdaFunctions = logGroups.map(function (el) { return el.logGroupName.replace('/aws/lambda/', ''); });
                        return [2 /*return*/, lambdaFunctions];
                }
            });
        });
    }
    function getMetricData(params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, MetricDataResults, NextToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, cloudwatch.getMetricData(params).promise()];
                    case 1:
                        _a = _b.sent(), MetricDataResults = _a.MetricDataResults, NextToken = _a.NextToken;
                        MetricDataResults.forEach(function (el) {
                            if (el.Values.length) {
                                var func = el.Label.split(' ')[0];
                                var metric = el.Label.split(' ')[1];
                                metrics[func][metric].values = __spreadArray(__spreadArray([], metrics[func][metric].values, true), el.Values, true);
                                metrics[func][metric].timestamps = __spreadArray(__spreadArray([], metrics[func][metric].timestamps, true), el.Timestamps, true);
                            }
                        });
                        if (!NextToken) return [3 /*break*/, 3];
                        params.NextToken = NextToken;
                        return [4 /*yield*/, getMetricData(params)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, metrics];
                }
            });
        });
    }
    var _a, region, arn, input, command, response, userCredentials, cloudwatchlogs, functions, cloudwatch, addQuery, params, metrics, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = res.locals.user, region = _a.region, arn = _a.arn;
                input = {
                    RoleArn: arn,
                    RoleSessionName: "test",
                    DurationSeconds: 900
                };
                command = new client_sts_1.AssumeRoleCommand(input);
                return [4 /*yield*/, client.send(command)];
            case 1:
                response = _c.sent();
                userCredentials = new aws_sdk_1["default"].Credentials({
                    accessKeyId: response.Credentials.AccessKeyId,
                    secretAccessKey: response.Credentials.SecretAccessKey,
                    sessionToken: response.Credentials.SessionToken
                });
                cloudwatchlogs = new aws_sdk_1["default"].CloudWatchLogs({
                    region: region,
                    credentials: userCredentials
                });
                return [4 /*yield*/, getFunctions()];
            case 2:
                functions = _c.sent();
                cloudwatch = new aws_sdk_1["default"].CloudWatch({
                    region: region,
                    credentials: userCredentials
                });
                addQuery = function (func) {
                    params.MetricDataQueries.push({
                        Id: "invocations" + func.replaceAll('-', ''),
                        Label: "".concat(func, " Invocations"),
                        MetricStat: {
                            Metric: {
                                Namespace: "AWS/Lambda",
                                MetricName: "Invocations",
                                Dimensions: [
                                    {
                                        Name: 'FunctionName',
                                        Value: func
                                    },
                                ]
                            },
                            Period: 600,
                            Stat: "Sum"
                        }
                    }, {
                        Id: "duration" + func.replaceAll('-', ''),
                        Label: "".concat(func, " Duration"),
                        MetricStat: {
                            Metric: {
                                Namespace: "AWS/Lambda",
                                MetricName: "Duration",
                                Dimensions: [
                                    {
                                        Name: 'FunctionName',
                                        Value: func
                                    },
                                ]
                            },
                            Period: 600,
                            Stat: "Average"
                        }
                    }, {
                        Id: "errors" + func.replaceAll('-', ''),
                        Label: "".concat(func, " Errors"),
                        MetricStat: {
                            Metric: {
                                Namespace: "AWS/Lambda",
                                MetricName: "Errors",
                                Dimensions: [
                                    {
                                        Name: 'FunctionName',
                                        Value: func
                                    },
                                ]
                            },
                            Period: 600,
                            Stat: "Sum"
                        }
                    }, {
                        Id: "throttles" + func.replaceAll('-', ''),
                        Label: "".concat(func, " Throttles"),
                        MetricStat: {
                            Metric: {
                                Namespace: "AWS/Lambda",
                                MetricName: "Throttles",
                                Dimensions: [
                                    {
                                        Name: 'FunctionName',
                                        Value: func
                                    },
                                ]
                            },
                            Period: 600,
                            Stat: "Sum"
                        }
                    });
                };
                params = {
                    // eslint-disable-next-line @typescript-eslint/no-array-constructor
                    MetricDataQueries: new Array(),
                    StartTime: new Date(Date.now() - 10800000),
                    EndTime: new Date(),
                    ScanBy: "TimestampAscending",
                    MaxDatapoints: Number("10")
                };
                metrics = {};
                functions.forEach(function (el) {
                    addQuery(el);
                    metrics[el] = {
                        Invocations: {
                            values: [], timestamps: []
                        },
                        Duration: {
                            values: [], timestamps: []
                        },
                        Errors: {
                            values: [], timestamps: []
                        },
                        Throttles: {
                            values: [], timestamps: []
                        }
                    };
                });
                _b = res.locals;
                return [4 /*yield*/, getMetricData(params)];
            case 3:
                _b.metrics = _c.sent();
                return [2 /*return*/, next()];
        }
    });
}); };
exports.getMetrics = getMetrics;
//GET ERRORS MIDDLEWARE
var getErrors = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    function getErrorLogs(params) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var errors;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, cloudwatchlogs.filterLogEvents(params).promise()];
                    case 1:
                        errors = _b.sent();
                        (_a = errors.events) === null || _a === void 0 ? void 0 : _a.forEach(function (event) { return errorList.push(event); });
                        if (!errors.nextToken) return [3 /*break*/, 3];
                        params.nextToken = errors.nextToken;
                        return [4 /*yield*/, getErrorLogs(params)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/, errorList];
                }
            });
        });
    }
    var _a, region, arn, func, input, command, response, userCredentials, cloudwatchlogs, errorParams, errorList, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, region = _a.region, arn = _a.arn, func = _a.func;
                input = {
                    RoleArn: arn,
                    RoleSessionName: "test",
                    DurationSeconds: 900
                };
                command = new client_sts_1.AssumeRoleCommand(input);
                return [4 /*yield*/, client.send(command)];
            case 1:
                response = _c.sent();
                userCredentials = new aws_sdk_1["default"].Credentials({
                    accessKeyId: response.Credentials.AccessKeyId,
                    secretAccessKey: response.Credentials.SecretAccessKey,
                    sessionToken: response.Credentials.SessionToken
                });
                cloudwatchlogs = new aws_sdk_1["default"].CloudWatchLogs({
                    region: region,
                    credentials: userCredentials
                });
                errorParams = {
                    logGroupName: "/aws/lambda/".concat(func),
                    filterPattern: 'ERROR',
                    startTime: Date.now() - 10800000,
                    endTime: Date.now()
                };
                errorList = [];
                _b = res.locals;
                return [4 /*yield*/, getErrorLogs(errorParams)];
            case 2:
                _b.errors = _c.sent();
                return [2 /*return*/, next()];
        }
    });
}); };
exports.getErrors = getErrors;
