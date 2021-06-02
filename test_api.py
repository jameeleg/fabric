import requests

port = 3000
base_url = "http://127.0.0.1:" + str(port)


def test_first_stock():
    response = requests.get(base_url+'/stock')
    assert response.status_code == 200
    response_body = response.json()
    assert response_body == [
        {'amount': 10, 'name': 'milk'},
        {'amount': 10, 'name': 'bread'},
        {'amount': 10, 'name': 'salt'},
        {'amount': 10, 'name': 'soap'},
        {'amount': 10, 'name': 'pasta'}]


def test_first_tasks():
    response = requests.get(base_url+'/tasks')
    assert response.status_code == 200
    response_body = response.json()
    assert response_body == []


def test_flow():
    response = requests.post(base_url+'/order', json=['pasta', 'bread'])
    assert response.status_code == 200

    response = requests.post(base_url+'/supply', json=['bread'])
    assert response.status_code == 200

    response = requests.get(base_url+'/tasks')
    assert response.status_code == 200
    response_body = response.json()
    assert response_body == [
        {'id': 0, 'action': 'pick_from_stock', 'product': 'pasta', 'location': [9, 2]},
        {'id': 1, 'action': 'pick_from_stock', 'product': 'bread', 'location': [1, 5]},
        {'id': 2, 'action': 'put_to_stock', 'product': 'bread', 'location': [1, 5]}]

    # ending tasks
    response = requests.post(base_url+'/tasks/0/complete')
    assert response.status_code == 200
    response = requests.post(base_url+'/tasks/1/complete')
    assert response.status_code == 200
    response = requests.post(base_url+'/tasks/2/complete')
    assert response.status_code == 200

    response = requests.get(base_url+'/stock')
    assert response.status_code == 200
    response_body = response.json()
    assert response_body == [
        {'amount': 10, 'name': 'milk'},
        {'amount': 10, 'name': 'bread'},
        {'amount': 10, 'name': 'salt'},
        {'amount': 10, 'name': 'soap'},
        {'amount': 9, 'name': 'pasta'}]
