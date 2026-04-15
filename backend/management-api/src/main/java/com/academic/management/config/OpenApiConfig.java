package com.academic.management.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI(){
        return new OpenAPI()
            .info(new Info()
            .title("API de Gestion Académica")
            .version("1.0.0")
            .description("Servicio para la administración de notas")
            .contact(new Contact()
                .name("Soporte Técnico")
                .email("soporte@ues.edu.sv")));
    }

}
