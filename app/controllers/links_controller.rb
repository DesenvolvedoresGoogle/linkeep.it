class LinksController < ApplicationController

  before_action :set_link, only: [:show, :edit, :update, :destroy, :read, :unread]

  # GET /links
  # GET /links.json
  def index
    @links = current_user.links.order created_at: :desc
    @link_count = @links.count
    @tags = @links.all_tags.order taggings_count: :desc

    if params[:read].present?
      @links = @links.where(read: params[:read] == 'true')
    end

    if params[:tag].present?
      @links = @links.tagged_with params[:tag]
    end
  end

  # GET /links/1
  # GET /links/1.json
  def show
  end

  # GET /links/new
  def new
    @link = Link.new
  end

  def read
    @link.read = true
    @link.save
    redirect_to links_url, notice: 'Link marked as read succesfully.'
  end

  def unread
    @link.read = false
    @link.save
    redirect_to links_url, notice: 'Link marked as unread succesfully.'
  end

  # GET /links/1/edit
  def edit
  end

  # POST /links
  # POST /links.json
  def create
    @link = Link.new(link_params)
    @link.user = current_user

    respond_to do |format|
      if @link.save
        format.html { redirect_to links_url, notice: 'Link was successfully created.' }
        format.json { render :show, status: :created, location: @link }
      else
        format.html { render :new }
        format.json { render json: @link.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /links/1
  # PATCH/PUT /links/1.json
  def update
    respond_to do |format|
      if @link.update(link_params)
        format.html { redirect_to links_url, notice: 'Link was successfully updated.' }
        format.json { render :show, status: :ok, location: @link }
      else
        format.html { render :edit }
        format.json { render json: @link.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /links/1
  # DELETE /links/1.json
  def destroy
    @link.destroy
    respond_to do |format|
      format.html { redirect_to links_url, notice: 'Link was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_link
      @link = Link.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def link_params
      params.require(:link).permit(:name, :url, :tag_list)
    end

    def links_for_user_and_tag
      links = current_user.links

      if params[:tag].present?
        links = links.tagged_with params[:tag]
      end

      links
    end
end
