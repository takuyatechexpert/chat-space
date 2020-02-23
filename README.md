
#chat space DB設計

## users テーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false, null:false, unique: true|
### Association
- has_many :messages
- has_many :group_users
- has_many :groups, through: :group_users

## messages テーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|sring|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :user
- belongs_to :group

## groups_users テーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## groups テーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :messeage
- has_many :group_users
- has_many :users, through: :group_users

[![Image from Gyazo](https://i.gyazo.com/2429c7c265b9f6623b49343ff605723d.gif)](https://gyazo.com/2429c7c265b9f6623b49343ff605723d)

![フォロー機能](https://gyazo.com/fc5c1baa4d2e36ac7b27f4207269755e)
