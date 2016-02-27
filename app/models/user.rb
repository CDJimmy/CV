class User < ActiveRecord::Base
    before_save { self.email = email.downcase }
    validates :firstName,  presence: true, length: { maximum: 50 }
    validates :lastName,  presence: true, length: { maximum: 50 }
    validates :age,  presence: true, length: { maximum: 3 }
    
    VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
    validates :email, presence: true, length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
    
    #def a_method_used_for_validation_purposes
    #    errors[:name] = "cannot contain the characters !@#%*()_-+="
    #end
end
