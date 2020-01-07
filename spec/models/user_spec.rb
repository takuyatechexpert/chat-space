require 'rails_helper'
RSpec.describe Message, type: :model do
  
  it "is valid with a nickname, email, password, password_confirmation" do
    user = build(:user)
    expect(user).to be_valid
  end

  it "is valid with a nickname" do
    user = build(:user, nickname: "")
    user.valid?
    expect(user.errors[:nickname]).to include("can't be blank")
  end

  it "is valid with a email" do
    user = build(:user, email: "")
    user.valid?
    expect(user.errors[:email]).to include("can't be blank")
  end

  it "is valid with a password" do
    user = build(:user, password: "")
    user.valid?
    expect(user.errors[:password]).to include("can't be blank")
  end

  it "is valid with a password_confirmation" do
    user = build(:user, password_confirmation: "")
    user.valid?
    expect(user.errors[:password_confirmation]).to include("doesn't match Password")
  end

  it "is invalid without a nickname that has more than 7 characters" do
    user = build(:user, nickname: "aaaaaaa")
    user.valid?
    expect(user.errors[:nickname]).to include("is too long (maximum is 6 characters)")
  end

  it "is valid with a nickname that has less than 6 characters" do
    user = build(:user, nickname: "aaaaaa")
    expect(user).to be_valid
  end

  it "is invalid with a duplicate email address" do
    user = create(:user)
    another_user = build(:user, email: user.email)
    another_user.valid?
    expect(another_user.errors[:email]).to include("has already been taken")
  end

  it "is valid with a password that has more than 6 characters " do
    user = build(:user, password: "000000", password_confirmation: "000000")
    user.valid?
    expect(user).to be_valid
  end

  it "is invalid with a password that has less than 5 characters " do
    user = build(:user, password: "00000", password_confirmation: "00000")
    user.valid?
    expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
  end

end