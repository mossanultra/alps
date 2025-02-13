from PIL import Image

def add_cube(x, y, size, thickness, vertex_count, obj_lines):
    """
    (x, y) を左下隅とする正方形を、Z軸方向に厚み thickness をもたせたキューブを生成します。
    生成した頂点情報と面情報を obj_lines に追記し、更新後の vertex_count を返します。
    """
    # キューブの8頂点 (Z=0 と Z=thickness の2層)
    vertices = [
        (x, y, 0),
        (x + size, y, 0),
        (x + size, y + size, 0),
        (x, y + size, 0),
        (x, y, thickness),
        (x + size, y, thickness),
        (x + size, y + size, thickness),
        (x, y + size, thickness),
    ]
    # 頂点を出力（OBJでは頂点は書いた順に1から自動採番されるので、vertex_countは次の頂点番号）
    for v in vertices:
        obj_lines.append(f"v {v[0]} {v[1]} {v[2]}")
    
    # 現在書き込まれた頂点は、vertex_count～vertex_count+7となるはずです。
    # OBJの頂点番号はファイル内で1から始まるため、現在の頂点番号の開始は vertex_count となる
    offset = vertex_count  - 1  # 調整：vertex_countが次に割り当てる番号なので、現在のブロックの最初の頂点は (vertex_count-1)+1 = vertex_count
    
    # キューブの面（各面は4頂点のポリゴン）
    faces = [
        (1, 2, 3, 4),   # 底面
        (5, 6, 7, 8),   # 上面
        (1, 2, 6, 5),   # 前面
        (2, 3, 7, 6),   # 右側面
        (3, 4, 8, 7),   # 背面
        (4, 1, 5, 8)    # 左側面
    ]
    for face in faces:
        # faceの各頂点番号に対して、グローバルな番号に変換
        indices = [str(offset + idx) for idx in face]
        obj_lines.append("f " + " ".join(indices))
    
    return vertex_count + 8

def main():
    # 入力画像（ピクセルアート）のパス
    image_path = "a.png"  # 例：ピクセルアート画像
    output_obj = "output.obj"
    output_mtl = "output.mtl"
    
    # キューブのサイズと押し出しの厚み（任意の単位）
    cube_size = 1.0
    extrusion_thickness = 1.0
    
    # Pillowで画像読み込み（RGBA変換）
    im = Image.open(image_path).convert("RGBA")
    width, height = im.size
    
    # OBJファイル用の行リスト。先頭でMTLファイルを参照するようにする
    obj_lines = [f"mtllib {output_mtl}"]
    vertex_count = 1  # OBJの頂点番号は1から開始
    
    # 材質情報を保持する辞書：キーは "mat_R_G_B" 形式、値は (R, G, B)
    materials = {}
    
    # 各ピクセルを走査（画像の上端をY=height-1として反転）
    for j in range(height):
        for i in range(width):
            pixel = im.getpixel((i, j))
            # アルファ値が0より大きければ、そのピクセルは有効
            if pixel[3] > 0:
                r, g, b = pixel[0], pixel[1], pixel[2]
                # 材質名は色の値から生成
                mat_name = f"mat_{r}_{g}_{b}"
                if mat_name not in materials:
                    materials[mat_name] = (r, g, b)
                # 画像座標の変換：左下原点にするためにY座標を反転
                x = i
                y = height - 1 - j
                # ピクセル毎にマテリアルを切り替え、OBJでは「usemtl」で材質指定
                obj_lines.append(f"usemtl {mat_name}")
                # キューブを追加し、vertex_countを更新
                vertex_count = add_cube(x, y, cube_size, extrusion_thickness, vertex_count, obj_lines)
    
    # OBJファイルを書き出し
    with open(output_obj, "w") as f_obj:
        f_obj.write("\n".join(obj_lines))
    
    # MTLファイルの生成（各材質ごとに色情報を書き出す）
    mtl_lines = []
    for mat_name, (r, g, b) in materials.items():
        # 0-255 の値を 0.0-1.0 に正規化
        r_f, g_f, b_f = r / 255.0, g / 255.0, b / 255.0
        mtl_lines.append(f"newmtl {mat_name}")
        mtl_lines.append(f"Ka {r_f:.3f} {g_f:.3f} {b_f:.3f}")  # 環境光色
        mtl_lines.append(f"Kd {r_f:.3f} {g_f:.3f} {b_f:.3f}")  # 拡散反射色
        mtl_lines.append("Ks 0.000 0.000 0.000")              # 鏡面反射色
        mtl_lines.append("d 1.0")                              # 不透明度
        mtl_lines.append("illum 2")
        mtl_lines.append("")  # 空行で区切り
    with open(output_mtl, "w") as f_mtl:
        f_mtl.write("\n".join(mtl_lines))
    
    print("OBJ と MTL ファイルが生成されました:")
    print("  ", output_obj)
    print("  ", output_mtl)

if __name__ == "__main__":
    main()
