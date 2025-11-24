import http.server
import socketserver

PORT = 8000  # サーバーを起動するポート番号（任意の番号に変更可能）

class MyHandler(http.server.SimpleHTTPRequestHandler):
    # 必要に応じてリクエスト処理をカスタマイズ可能です
    pass

if __name__ == "__main__":
    with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
        print(f"Serving at http://localhost:{PORT}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nサーバーを停止します。")
            httpd.server_close()
