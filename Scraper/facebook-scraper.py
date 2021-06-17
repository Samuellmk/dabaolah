import pandas as pd
from facebook_scraper import *
from openpyxl import load_workbook

HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})

def save_product(comment, image_url1, image_url2, image_url3):
    wb = load_workbook('data.xlsx')
    ws = wb.active
    ws.append([comment, image_url1, image_url2, image_url3])
    wb.save('data.xlsx')

def remove_duplicates():
    data = pd.read_excel('data.xlsx')
    data.drop_duplicates()

def search_product():
    x = 0
    tracker_log = pd.DataFrame()
    banned_words = ['DELIVERY', 'Delivery', 'delivery', 'islandwide', 'End']

    for post in get_posts(group = '268960887438286', pages = 4):
        comment = post['post_text']
        image_url = post['images']
        if (comment != None or comment != '') and not image_url == []:
            for word in banned_words:
                if word == 'End':
                    image1 = ''
                    image2 = ''
                    image3 = ''
                    y = 0
                    for image in image_url:
                        if y == 0:
                            image1 = image
                            y += 1
                        elif y == 1:
                            image2 = image
                            y += 1
                        elif y == 2:
                            image3 = image
                            y += 1
                        else:
                            break
                    save_product(comment, image1, image2, image3)
                    x += 1
                    print(x)
                elif word in comment:
                    break

search_product()
remove_duplicates()