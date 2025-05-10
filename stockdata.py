from flask import Flask, jsonify, request
import yfinance as yf
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

def format_datetime_column(df):
    """Convert datetime to ISO format for JSON compatibility."""
    if 'Date' in df.columns:
        df['Date'] = df['Date'].dt.strftime('%Y-%m-%dT%H:%M:%S')
    elif 'Datetime' in df.columns:
        df['Datetime'] = df['Datetime'].dt.strftime('%Y-%m-%dT%H:%M:%S')
    elif df.index.name in ['Date', 'Datetime']:
        df.index = df.index.strftime('%Y-%m-%dT%H:%M:%S')
    return df


@app.route('/stock/<ticker>', methods=['GET'])
def get_stock_data(ticker):
    try:
        interval = request.args.get('interval', '5m')
        stock = yf.Ticker(ticker)
        data = stock.history(period='1d', interval=interval).reset_index()
        data = format_datetime_column(data)
        response = {
            "ticker": ticker,
            "interval": interval,
            "data": data.to_dict('records')
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stocks/latest/', methods=['GET'])
def get_stocks_data():
    try:
        tickers = request.args.get('tickers')
        if not tickers:
            return jsonify({"error": "The 'tickers' query parameter is required."}), 400

        tickers_list = tickers.split(',')
        response = {}

        for ticker in tickers_list:
            try:
                stock = yf.Ticker(ticker.strip())
                data = stock.history(period='1d')
                response[ticker] = data.reset_index().to_dict('records')
            except Exception as e:
                response[ticker] = {"error": str(e)}

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stock/date-range/<ticker>', methods=['GET'])
def get_stock_data_by_date_range(ticker):
    try:
        start_date = request.args.get('start')
        end_date = request.args.get('end')
        if not start_date or not end_date:
            return jsonify({"error": "Both 'start' and 'end' query parameters are required."}), 400

        stock = yf.Ticker(ticker)
        data = stock.history(start=start_date, end=end_date)
        response = {
            "ticker": ticker,
            "data": data.reset_index().to_dict('records')
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stocks/date-range/', methods=['GET'])
def get_stocks_data_by_date_range():
    try:
        tickers = request.args.get('tickers')
        start_date = request.args.get('start')
        end_date = request.args.get('end')

        if not tickers or not start_date or not end_date:
            return jsonify({"error": "Parameters 'tickers', 'start', and 'end' are required."}), 400

        tickers_list = tickers.split(',')
        response = {}

        for ticker in tickers_list:
            try:
                stock = yf.Ticker(ticker.strip())
                data = stock.history(start=start_date, end=end_date)
                response[ticker] = data.reset_index().to_dict('records')
            except Exception as e:
                response[ticker] = {"error": str(e)}

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stock/latest-price/<ticker>', methods=['GET'])
def get_latest_price(ticker):
    try:
        stock = yf.Ticker(ticker)
        stock_info = stock.info
        latest_price = stock_info.get('last_price', stock_info.get('regularMarketPrice', 'No price available'))
        response = {
            "ticker": ticker,
            "latest_price": latest_price
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stocks/latest-prices/', methods=['GET'])
def get_latest_prices():
    try:
        tickers = request.args.get('tickers')
        if not tickers:
            return jsonify({"error": "The 'tickers' query parameter is required."}), 400

        tickers_list = tickers.split(',')
        response = {}

        for ticker in tickers_list:
            ticker = ticker.strip()
            try:
                stock = yf.Ticker(ticker)
                stock_info = stock.info
                latest_price = stock_info.get('last_price', stock_info.get('regularMarketPrice', 'No price available'))
                response[ticker] = {"latest_price": latest_price}
            except Exception as e:
                response[ticker] = {"error": str(e)}

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stock/minute-data/', methods=['GET'])
def get_minute_data():
    try:
        ticker = request.args.get('ticker')
        start_date = request.args.get('start')
        end_date = request.args.get('end')
        if not ticker or not start_date or not end_date:
            return jsonify({"error": "Parameters 'ticker', 'start', and 'end' are required."}), 400

        stock = yf.Ticker(ticker)
        data = stock.history(start=start_date, end=end_date, interval='1m')
        response = {
            "ticker": ticker,
            "data": data.reset_index().to_dict('records')
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stock/latest-news/<ticker>', methods=['GET'])
def get_latest_news(ticker):
    try:
        stock = yf.Ticker(ticker)
        news = stock.news
        response = {
            "ticker": ticker,
            "news": news
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/stocks/latest-news/', methods=['GET'])
def get_latest_news_multiple():
    try:
        tickers = request.args.get('tickers')
        if not tickers:
            return jsonify({"error": "The 'tickers' query parameter is required."}), 400

        tickers_list = tickers.split(',')
        response = {}

        for ticker in tickers_list:
            ticker = ticker.strip()
            try:
                stock = yf.Ticker(ticker)
                news = stock.news
                response[ticker] = {"news": news}
            except Exception as e:
                response[ticker] = {"error": str(e)}

        return jsonify(response), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(port=8080, debug=True)
