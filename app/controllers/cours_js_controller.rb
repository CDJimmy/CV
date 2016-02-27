class CoursJsController < ApplicationController
    skip_before_action :verify_authenticity_token
    def exos
        @users = User.order(:indexOrder)
        respond_to do |format|
            format.js
            format.html
        end 
    end
    def users
        @users = User.order(:indexOrder)
        render json: @users
    end
    def create
        unless User.exists?((JSON.parse params[:user])['id'])
            @user = User.new(JSON.parse params[:user])
            User.any? ? @user.indexOrder = User.order("created_at").last.indexOrder + 1 : @user.indexOrder = 1
            if @user.save
                render :partial => 'user', :locals => { :user => @user }
            else
                render json: @user.errors.full_messages, status: :unprocessable_entity
            end
        else
            @user = User.find((JSON.parse params[:user])['id'])
            if @user.update(JSON.parse params[:user])
                render :partial => 'user', :locals => { :user =>  @user}
            else
                render json: @user.errors.full_messages, status: :unprocessable_entity
            end
        end
    end
    
    def indexOrderRange
        @user1 = User.find((JSON.parse params[:indexOrderArray])['userId'])
        @user1.indexOrder = (JSON.parse params[:indexOrderArray])['userIndex']
        
        @user2 = User.find((JSON.parse params[:indexOrderArray])['userId2'])
        @user2.indexOrder = (JSON.parse params[:indexOrderArray])['userIndex2']
                
        @user1.save
        @user2.save
        
        render json: true
    end
    
    def user
        @user = User.new
        render :partial=>'user', :locals => { :user => @user }
    end
    
    
    def delete
        indexOrder = (JSON.parse params[:user])['indexOrder']
        
        users = User.where("indexOrder > ?", indexOrder).all
        User.transaction do
            User.where(["indexOrder > ?", indexOrder]).order("indexOrder DESC").each do |user|
                user.indexOrder -= 1
                user.save
            end
        end
        
        if User.delete((JSON.parse params[:user])['id'])
            render json: true
        else
            render json: false
        end
    end
end
