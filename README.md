
#chat space DB設計

## users テーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false, null:false, unique: true|
### Association
- has_many :messages
- belongs_to :group
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
- belongs_to :groups_users

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
- has_many :group_users
- has_many :users, through: :group_users