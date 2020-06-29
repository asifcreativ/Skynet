# GIT setup
    git init -> Initialized empty Git repository

# GIT commit
    1. git add .
    2. git commit -m "message"
    3. git push origin master

# dotnet ef migrations
    -p Infrastructure -s API -o Data/Migrations 
        -c DbContext ->    -p Infrastructure -s API -c StoreContext
    
    REMOVE MIGRATION: dotnet ef migrations remove -p infrastructure -s API -c AppIdentityDbContext
    ADD MIGRATION: dotnet ef migrations add IdentityInitial -p infrastructure -s API -o Identity/Migrations -c AppIdentityDbContext

# Entity Framework -> Lazy loading | Eager Loading

# https://localhost:5001/swagger


add entities Brands and Types; add seed data; implemented APIs for get Brands and Types

generic repository; specification pattern; DTOs; add auto mapper;

error handling and exception; http response error; server error; validation error; Adding Swagger for documenting API; clean up the Startup class;

# OR/Else condition
sorting; filtering; searching; paging; add CORS;

setup angular project;

implement navbar; add http client module;

# Angular module structure
    App Module
        Code Module: singleton e.g. navbar
        Shared Module: shared component
        Feature Module: app features each feature will have it's own module and routing

# Angular CLI commands for generate components
    c: for component
    m: for module
    s: for service
    --flat: do not create separate folder
    --skip-tests: do not include test files

    ng g c/m/s component-name --flat --skip-tests

# *ngFor, *ngIf -> * mean it's gonna change the DOM

# bootstrap h-100 -> all the carts will be equal hights

# pipe() is warper around rxjs methods e.g. map(), delay(). we can chain rxjs methods inside pipe()


implement shop component, client side paging, searching and filtering 

setup routing; nav links; module lazy loading

error handling;http interceptor; toast notification;

PASS state via router

improve UI; add page header, breadcrumbs; style product items; add loading icon; change bootstrap theme; improve home page;  

# async: pipe in html template -> subscript and automatically unsubscribe observable when component destroyed


# Redis -> is in memory datastore (cashing)
# Redis commands:
    redis-server
    redis-cli
        ping
    # how to shutdown redis?
    quit
        redis-cli
            shutdown


 add Redis to API; create basket repository and controller; client-side implementation basket; behavior subject; async pipe

 setting up ASP.NET identity
    user manager
    sign-in manager
    JWT

add validation; update swagger configuration

add account feature; implement form; client side validation; async validation;



# Generate files
    ng g m <MODULE_NAME>
    cd <MODULE_NAME>
    ng g m <MODULE_NAME-routing> --flat
    ng g c <COMPONENT_NAME> --flat --skip-tests
    ng g s <SERVICE_NAME> --flat --skip-tests


# ControlValueAccessor
    Defines an interface that acts as a bridge between the Angular forms API and a native element in the DOM


add order entity; aggregate entities; unit of work pattern

