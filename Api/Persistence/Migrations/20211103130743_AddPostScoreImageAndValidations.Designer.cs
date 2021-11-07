﻿// <auto-generated />
using System;
using Afix.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Affix.Persistence.Migrations
{
    [DbContext(typeof(AffixContext))]
    [Migration("20211103130743_AddPostScoreImageAndValidations")]
    partial class AddPostScoreImageAndValidations
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "6.0.0-preview.6.21352.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Affix.Persistence.DataModels.PostDataModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Header")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<Guid>("ImageId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<string>("Moniker")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<string>("Summary")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("nvarchar(500)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.HasKey("Id")
                        .HasName("PrimaryKey_Id");

                    b.ToTable("Posts");
                });

            modelBuilder.Entity("Affix.Persistence.DataModels.ScoreDataModel", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Likes")
                        .HasColumnType("int");

                    b.Property<Guid>("PostId")
                        .HasColumnType("uniqueidentifier");

                    b.Property<int>("Shares")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("PostId")
                        .IsUnique();

                    b.ToTable("Scores");
                });

            modelBuilder.Entity("Affix.Persistence.DataModels.ScoreDataModel", b =>
                {
                    b.HasOne("Affix.Persistence.DataModels.PostDataModel", "Post")
                        .WithOne("Score")
                        .HasForeignKey("Affix.Persistence.DataModels.ScoreDataModel", "PostId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Post");
                });

            modelBuilder.Entity("Affix.Persistence.DataModels.PostDataModel", b =>
                {
                    b.Navigation("Score")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
