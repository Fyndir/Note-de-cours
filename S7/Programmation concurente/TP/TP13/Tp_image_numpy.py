# Dec 19 : adaptation BE image à Numpy (pas de PIL)
#-------------------------------
# Nov 2019 : ma version de TD3 (image) séance 2
# J'ai fait qq modifs, ajouté main (bordel !)
# ET ajouté des tests pour chaque partie.
# Les résultats sont pas mal. Surtout après Ex 2.3 (lancer et regarder les prompts sur input.)

from math import sqrt, log10
import os

# Pour la version avec numpy
import numpy as np  
import matplotlib.pyplot as plt	
import matplotlib.image as mpimg

def put_color_into_matrice_pixels(coin_x, coin_y, width, height, color):
	for i in range(coin_x, coin_x + width):
		for j in range(coin_y, coin_y + height):
			matrice_pixels[i, j] = color


def avg(coin_x, coin_y, width, height):
	sr, sg, sb = 0, 0, 0
	for i in range(coin_x, coin_x + width):
		for j in range(coin_y, coin_y + height):
			r, g, b = matrice_pixels[i, j]
			sr += r
			sg += g
			sb += b
	a = width * height
	a+=10**-7 # ALEX pour éviter div par 0
	return sr / a, sg / a, sb / a

def std2(coin_x, coin_y, width, height):
	ar, ag, ab = avg(coin_x, coin_y, width, height)
	sr, sg, sb = 0, 0, 0
	for i in range(coin_x, coin_x + width):
		for j in range(coin_y, coin_y + height):
			r, g, b = matrice_pixels[i, j]
			sr += (r - ar) ** 2
			sg += (g - ag) ** 2
			sb += (b - ab) ** 2
	a = width * height
	a+=10**-7 # ALEX pour éviter div par 0
	return sqrt(sr / a), sqrt(sg / a), sqrt(sb / a)

#===========================================================
# Exercice 1 : créer la classe Noeud
#========================================================s===
class Noeud:
	def __init__(self, coin_x, coin_y, width, height, haut_gche, haut_dte, bas_gche, bas_dte, color):
		self.coin_x = coin_x
		self.coin_y = coin_y
		self.width = width
		self.height = height
		self.haut_gche = haut_gche
		self.haut_dte = haut_dte
		self.bas_gche = bas_gche
		self.bas_dte = bas_dte
		self.color = color

def creation_regions_V1(coin_x, coin_y, width, height, seuil):
	#if width == 0 or height == 0:
		#return None
	if width*height < 4 :
		 return
	elif sum(std2(coin_x, coin_y, width, height))//3 < seuil:
		return Noeud(coin_x, coin_y, width, height, None, None, None, None, 
		             tuple(map(int, avg(coin_x, coin_y, width, height))))
	else:
		haut_gche = creation_regions_V1(coin_x, coin_y, width // 2, height // 2, seuil)
		haut_dte = creation_regions_V1(coin_x + width // 2, coin_y, width - width // 2, height // 2, seuil)
		bas_gche = creation_regions_V1(coin_x, coin_y + height // 2, width // 2, height - height // 2, seuil)
		bas_dte = creation_regions_V1(coin_x + width // 2, coin_y + height // 2, width - width // 2, 
		                              height - height // 2, seuil)
		return Noeud(coin_x, coin_y, width, height, haut_gche, haut_dte, bas_gche, bas_dte, None)
	
#===========================================================
# Exercice 2
# Parcourt les enfants de node, et peint sur l'image "im" tous les noeuds terminaux
#===========================================================
def apply_node_color_to_his_region_in_mat_pixels(node):
	if not node :
		 return
	if node.color != None:
		put_color_into_matrice_pixels(node.coin_x, node.coin_y, node.width, node.height, node.color)
	else:
		apply_node_color_to_his_region_in_mat_pixels(node.haut_gche)
		apply_node_color_to_his_region_in_mat_pixels(node.haut_dte)
		apply_node_color_to_his_region_in_mat_pixels(node.bas_gche)
		apply_node_color_to_his_region_in_mat_pixels(node.bas_dte)

#===========================================================
# Exercice 3
# Parcourt les enfants de node, et peint en niveaux de gris la profondeur de chaque noeud terminal
# 20 x 20 x 20 fait du gris .....?
#===========================================================
def apply_gray_color_a_la_matrice_selon_niveau_de_l_arbre(colr_to_apply, node, depth):
	if not node :
		 return	
	#light_gray=128 #211
	
	if node.color != None:
		r,g,b=colr_to_apply
		#put_color_into_matrice_pixels(node.coin_x, node.coin_y, node.width, node.height, (facteur * depth, facteur * depth, facteur * depth))
		print('on applique la couleur à width x height : ', node.width, node.height)
		put_color_into_matrice_pixels(node.coin_x, node.coin_y, node.width, node.height, ((r*depth) % 255, (g*depth)%255 , (g*depth)%255))
	else:
		apply_gray_color_a_la_matrice_selon_niveau_de_l_arbre(colr_to_apply, node.haut_gche, depth + 1)
		apply_gray_color_a_la_matrice_selon_niveau_de_l_arbre(colr_to_apply, node.haut_dte, depth + 1)
		apply_gray_color_a_la_matrice_selon_niveau_de_l_arbre(colr_to_apply, node.bas_gche, depth + 1)
		apply_gray_color_a_la_matrice_selon_niveau_de_l_arbre(colr_to_apply, node.bas_dte, depth + 1)

#===========================================================
# Exercice 4
# Calcul de la dispersion
#===========================================================
def Err_quadratique(node):
	if not node :
		 return 0	
	if node.color != None:
		sum = 0
		r, g, b = node.color
		for coin_x in range(node.coin_x, node.coin_x + node.width):
			for coin_y in range(node.coin_y, node.coin_y + node.height):
				r0, g0, b0 = matrice_pixels[coin_x, coin_y]
				sum += (r - r0)**2 + (g - g0)**2 + (b - b0)**2
		return sum
	else:
		return Err_quadratique(node.haut_gche) + Err_quadratique(node.haut_dte) + \
		       Err_quadratique(node.bas_gche) + Err_quadratique(node.bas_dte)

def PSNR(node):
	print(Err_quadratique(node), node.width, node.height)
	# ALEX : j'ajoute 10**-6 au cas où EQ=0 qui posera pb avec log 
	return 20 * log10(255) - 10 * log10((Err_quadratique(node)+10**-6) / 3 / node.width / node.height)

#===========================================================
# Exercice 5
# Parcourt les enfants de node, et fait un print pour chaque noeud terminal
#===========================================================
def tracer_les_noeuds_crees(node):
	if not node :
		 return	
	if node.color != None:
		color = node.color
		print(node.coin_x, node.coin_y, node.width, node.height, color[0], color[1], color[2])
	else:
		tracer_les_noeuds_crees(node.haut_gche)
		tracer_les_noeuds_crees(node.haut_dte)
		tracer_les_noeuds_crees(node.bas_gche)
		tracer_les_noeuds_crees(node.bas_dte)


#===========================================================
# Exercice 2.6
# Renvoie la racine d'une quadripartition englobant la zone donnee, avec une
# limite de noeuds terminaux. A chaque etape on repartit les noeuds a allouer
# en fonction de la complexite de chaque quart
#===========================================================
def creation_regions_V2(coin_x, coin_y, width, height, limite_nb_feuilles):
	# TRACE : 
	# print(coin_x, coin_y, width, height)
	if limite_nb_feuilles < 4 or width == 1 or height == 1:
		return Noeud(coin_x, coin_y, width, height, None, None, None, None,tuple(map(int, avg(coin_x, coin_y, width, height))))
	else:
		deviation_haut_gche = max(sum(std2(coin_x, coin_y, width // 2, height // 2)), 0.001)
		deviation_haut_dte = max(sum(std2(coin_x + width // 2, coin_y, width - width // 2, height // 2)), 0.001)
		deviation_bas_gche = max(sum(std2(coin_x, coin_y + height // 2, width // 2, height - height // 2)), 0.001)
		deviation_bas_dte = max(sum(std2(coin_x + width // 2, coin_y + height // 2, width - width // 2,height - height // 2)), 0.001)
		nb_feuilles_haut_gche = min(max(int(round(limite_nb_feuilles * deviation_haut_gche / (deviation_haut_gche + deviation_haut_dte + deviation_bas_gche + deviation_bas_dte))), 1),limite_nb_feuilles - 3)
		limite_nb_feuilles -= nb_feuilles_haut_gche
		nb_feuilles_haut_dte = min(max(int(round(limite_nb_feuilles * deviation_haut_dte / (deviation_haut_dte + deviation_bas_gche + deviation_bas_dte))), 1),limite_nb_feuilles - 2)
		limite_nb_feuilles -= nb_feuilles_haut_dte
		nb_feuilles_bas_gche = min(max(int(round(limite_nb_feuilles * deviation_bas_gche / (deviation_bas_gche + deviation_bas_dte))), 1), limite_nb_feuilles - 1)
		nb_feuilles_bas_dte = limite_nb_feuilles - nb_feuilles_bas_gche
		haut_gche = creation_regions_V2(coin_x, coin_y, width // 2, height // 2, nb_feuilles_haut_gche)
		haut_dte = creation_regions_V2(coin_x + width // 2, coin_y, width - width // 2, height // 2, nb_feuilles_haut_dte)
		bas_gche = creation_regions_V2(coin_x, coin_y + height // 2, width // 2, height - height // 2, nb_feuilles_bas_gche)
		bas_dte = creation_regions_V2(coin_x + width // 2, coin_y + height // 2, width - width // 2, height - height // 2, nb_feuilles_bas_dte)
		return Noeud(coin_x, coin_y, width, height, haut_gche, haut_dte, bas_gche, bas_dte, None)

#================================
# Utilitaires
# Compte le nombre de noeuds terminaux
def count(node):
	if not node :
		 return 0
	return 1 if node.color != None else \
	       count(node.haut_gche) + count(node.haut_dte) + count(node.bas_gche) + count(node.bas_dte)

def Not_used_modifier_mat_pixels_et_refaire_l_image(node):
	if not node :
		 return	
	if node.color != None:
		for i in range(node.coin_x, node.coin_x + node.width):
			for j in range(node.coin_y, node.coin_y + node.height):
				matrice_pixels[i,j]=(node.color[0], node.color[1], node.color[2])
	else:
		modifier_mat_pixels_et_refaire_l_image(node.haut_gche)
		modifier_mat_pixels_et_refaire_l_image(node.haut_dte)
		modifier_mat_pixels_et_refaire_l_image(node.bas_gche)
		modifier_mat_pixels_et_refaire_l_image(node.bas_dte)

#================== NUMPY ===========
def save_image_via_NUMPY(nom_fic_out) :
	global matrice_pixels
	mpimg.imsave(nom_fic_out, matrice_pixels)	

def montrer_image_via_sa_matrice_par_NUMPY() :
	global matrice_pixels	
	# Je crée un fich temporaire
	mpimg.imsave(".__temp__image2__.png", matrice_pixels)
	image_local = mpimg.imread(".__temp__image2__.png")

	# plt.imshow() demande à matplotlib d’interpréter cet array en tant qu’image bitmap. 
	#La commande plt.show() permet l’affichage
	plt.imshow(image_local)
	plt.ioff() # sans effet. Si je mets ion, ca n'affiche pas
	plt.show() # block la suite
	
	os.remove(".__temp__image2__.png")
	
def load_and_creer_mat_pixels_via_NUMPY(nom_fic_in) :

	global image_
	global matrice_pixels, width, height
	
	try :
		image_ = mpimg.imread(nom_fic_in)
	except :
		print("Problème anp.load ",nom_fic_in)
	
	
	image_ = mpimg.imread(nom_fic_in)	
	height,width,_=image_.shape
	
		
	if image_.dtype == np.float32:
		# mieux
		matrice_pixels=np.array([[(image_[i,j]*255).astype(np.uint8) \
		                       for i in range(image_.shape[0])] for j in range(image_.shape[1])])


	
#=====================================================================
if __name__ == "__main__" :
	global matrice_pixels, width, height

	# Je simplifie

	dir_image="Image"
	nom_fic_image="steve.png"
	#nom_fic_image="Elena.png"
	# nom_fic_image="Image_Lyon.bmp"
	nom_fic_in=dir_image+'/'+nom_fic_image

	# NUMPY
	load_and_creer_mat_pixels_via_NUMPY(nom_fic_in)
	
	seuil=16 # 16 pour steve , # 3 pour Elena #20 pour Lyon
	root=creation_regions_V1(0, 0, width, height, seuil)
	apply_node_color_to_his_region_in_mat_pixels(root)	
	# No need : modifier_mat_pixels_et_refaire_l_image(root)
	
	# NUMPY
	input("Fin (split) avec creation_regions_V1 (avec seuil "+str(seuil)+"): RC pour voir le résultat ?")
	montrer_image_via_sa_matrice_par_NUMPY()	
	
	
	# Les données modifiées, on recharge
	# NUMPY
	load_and_creer_mat_pixels_via_NUMPY(nom_fic_in)
	 
	root=creation_regions_V1(0, 0, width,height, seuil)
	colr_to_apply=12,25,65 # arbitraire, (0,0,0 fera noir partout)
	apply_gray_color_a_la_matrice_selon_niveau_de_l_arbre(colr_to_apply, root, 1)
	     
	# NUMPY
	montrer_image_via_sa_matrice_par_NUMPY()	
	input('Fin application  (gray) avec V1 : On continue ?')
	
	Distorsion = PSNR(root)
	print("Distorsion avec le seuil ", seuil, "= ", Distorsion)
	input('Fin Ex 2.4 (PSNR) avec creation_regions_V1 : On continue ?')
	
	
	# On sauvegarde le résultat
	nom_fic_out=dir_image+'/'+"out_"+nom_fic_image   # On construit le nom de l'image sauvegardée
	
	# NUMPY
	save_image_via_NUMPY(nom_fic_out)
	
	# Les données modifiées, on recharge
	# NUMPY
	load_and_creer_mat_pixels_via_NUMPY(nom_fic_in)
 
	creation_regions_V2(0, 0, width, height, 10000)
	Distorsion = PSNR(root)
	print("Distorsion avec le seuil ", seuil, "= ", Distorsion)
	input('Fin Ex 2.4_bis (PSNR) avec creation_regions_V2 : On continue ?')
	
	# Test Ex 2.5
	tracer_les_noeuds_crees(root)
	input('Fin Ex 2.5 (trace des noeuds avec V2) avec image initiale : On continue ?')
	
	# NUMPY
	montrer_image_via_sa_matrice_par_NUMPY()	
	
	root = creation_regions_V2(0, 0, width, height, 10000)	
	# qq tests en rapport avec 2.6
	apply_node_color_to_his_region_in_mat_pixels(root)
	
	# NUMPY
	montrer_image_via_sa_matrice_par_NUMPY()	
	input('Fin apply_node_color_to_his_region_in_mat_pixels (paint_children) : On continue ?')
	
	# Les données modifiées, on recharge
	# NUMPY
	load_and_creer_mat_pixels_via_NUMPY(nom_fic_in)
	
	root = creation_regions_V2(0, 0, width, height, 10000)
	colr_to_apply=119,136,153 # Gray ??
	apply_gray_color_a_la_matrice_selon_niveau_de_l_arbre(colr_to_apply, root, 1)
	#modifier_mat_pixels_et_refaire_l_image(root)
	# NUMPY
	montrer_image_via_sa_matrice_par_NUMPY()
	print('Fin application couleur Gray à V2.. on va manger ?')

#======================================================================================
